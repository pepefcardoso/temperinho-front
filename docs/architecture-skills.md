# architecture-skills.md — Temperinho Architecture

Padrões arquiteturais do projeto Temperinho.

---

## Visão Geral

```
Browser / Crawler
      │
      ▼
Next.js 15 App Router (Vercel / Docker)
      │
      ├── Server Components (SSR/SSG)
      │       └── fetch direto via axios com cookie do server
      │
      └── Client Components
              └── axios com token do localStorage
                      │
                      ▼
              Laravel REST API (:8000)
                      │
                      ├── PostgreSQL
                      ├── S3 (imagens)
                      └── Redis (cache/queue)
```

---

## Estratégia de Renderização por Rota

| Rota                      | Estratégia         | Razão                                      |
| ------------------------- | ------------------ | ------------------------------------------ |
| `/`                       | SSR dinâmico       | Receitas recentes atualizadas              |
| `/receitas`               | SSR + Client       | SSR inicial, Client para filtros/paginação |
| `/receitas/[id]`          | SSR dinâmico       | SEO + OG metadata                          |
| `/blog`                   | SSR dinâmico       | Filtros via searchParams                   |
| `/blog/[id]`              | SSR dinâmico       | SEO + OG metadata                          |
| `/sobre-nos`              | SSR dinâmico       | Dados da API                               |
| `/marketing`              | SSR + Suspense     | Planos da API                              |
| `/contato`                | Estático           | Sem dados dinâmicos                        |
| `/privacidade`, `/termos` | Estático           | Conteúdo fixo                              |
| `/usuario/*`              | Client (CSR)       | Dados privados, AuthGuard                  |
| `/auth/*`                 | Client (CSR)       | Fluxo de autenticação                      |
| `/sitemap.xml`            | SSR dinâmico       | Receitas + posts da API                    |
| `/robots.txt`             | Estático computado | Regras fixas                               |

---

## Autenticação

### Fluxo de Token

```
Login/Register
    │
    ▼
API retorna { token: string }
    │
    ▼
AuthContext.setToken(token)
    ├── localStorage.setItem('AUTH_TOKEN', token)   ← client-side requests
    └── Cookies.set('AUTH_TOKEN', token, { expires: 7 })  ← SSR requests
```

### Client-side (`src/lib/axios.ts`)

Interceptor de request lê `localStorage.getItem('AUTH_TOKEN')` e injeta em `Authorization: Bearer`.

Interceptor de response: status 401 → limpa localStorage e redireciona para `/auth/login`.

### Server-side (`src/lib/api/*.server.ts`)

Cada módulo server cria instância axios isolated com cookie:

```ts
const cookieStore = await cookies(); // next/headers
const token = cookieStore.get('AUTH_TOKEN')?.value;
return axios.create({ headers: { Authorization: `Bearer ${token}` } });
```

### Guards

```
AuthGuard   → verifica useAuth().user; redireciona para /auth/login se ausente
GuestGuard  → verifica useAuth().isAuthenticated; redireciona para /usuario/dashboard se presente
```

Ambos mostram spinner enquanto `loading === true` para evitar flash.

### OAuth Google

```
1. GET /api/auth/social/google → recebe { url: string }
2. window.location.href = url  → redireciona para Google
3. Google → backend /api/auth/google/callback
4. Backend → frontend /auth/callback?token=xxx
5. AuthCallbackPage → setToken(token) → router.push('/usuario/dashboard')
```

---

## Estrutura de Módulos de API

### Client-side (`src/lib/api/*.ts`)

Todas as funções usam `axiosClient` de `src/lib/axios.ts`:

```ts
// Padrão de recurso único
export async function getRecipeById(id: number): Promise<Recipe> {
  const response = await axiosClient.get<{ data: Recipe }>(`/recipes/${id}`);
  return response.data.data;
}

// Padrão paginado
export async function getRecipes(
  options = {}
): Promise<PaginatedResponse<Recipe>> {
  const response = await axiosClient.get<PaginatedResponse<Recipe>>(
    '/recipes',
    { params }
  );
  return response.data;
}

// Padrão de upload
export async function updateRecipe(
  id: number,
  data: FormData
): Promise<Recipe> {
  data.append('_method', 'PUT'); // Laravel method spoofing
  const response = await axiosClient.post<{ data: Recipe }>(
    `/recipes/${id}`,
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data;
}
```

### Server-side (`src/lib/api/*.server.ts`)

Sufixo `.server.ts` — importado apenas em Server Components ou page.tsx:

```ts
// blog.server.ts, recipe.server.ts, user.server.ts, company.server.ts
export async function getMyRecipes(options = {}) {
  const api = await createAuthenticatedServerApi();
  return api.get('/recipes/my', { params });
}
```

---

## Tipos de API

```ts
// Resposta paginada (src/types/api.ts)
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    // ...
  };
  links: { first, last, prev, next };
}

// Recurso único
{ data: T }

// Sem corpo
void (status 204)
```

---

## Padrão Server Component + Client Component

```
page.tsx (Server Component)
├── Busca dados da API (await)
├── Gera metadata (generateMetadata)
├── Trata erro → notFound() ou fallback
└── Renderiza <ClientComponent initialData={data} />

*Client.tsx (Client Component — 'use client')
├── useState para estado interativo
├── URL params para filtros persistentes
├── Mutações via axios
└── toast para feedback
```

Exemplo de split correto:

- `src/app/receitas/page.tsx` → SSR
- `src/components/recipe/RecipePageClient.tsx` → Client

---

## Hook `useFilterableList`

Hook centralizado para listas com filtros na área `/usuario`:

```ts
const {
  items, // lista atual (otimista, sem re-fetch)
  categories, // para o select de filtro
  searchParams, // URL searchParams atual
  debouncedSearch, // dispara handleFilterChange com 500ms de delay
  handleFilterChange, // atualiza URL param → Suspense key muda → re-SSR
  removeItemById, // remove otimistamente após delete
} = useFilterableList<T>({ initialItems, fetchCategories });
```

Filtros atualizam a URL → página pai tem `<Suspense key={suspenseKey}>` → novo fetch SSR automático.

---

## Formulários com Upload

Padrão para formulários com `multipart/form-data`:

```ts
// 1. Estado de preview local
const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(initialUrl);

// 2. Handler de change
const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // blob URL
  }
};

// 3. Cleanup de memória
useEffect(() => {
  return () => {
    if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
  };
}, [imagePreview]);

// 4. Submit via FormData
const formData = new FormData();
formData.append('_method', 'PUT'); // para updates
if (imageFile) formData.append('image', imageFile);
await updateResource(id, formData);
```

---

## SEO e Metadata

### Metadata Estático

```ts
export const metadata: Metadata = {
  title: 'Página | Temperinho',
  description: 'Descrição da página.',
};
```

### Metadata Dinâmico

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params;
  const resource = await getResourceById(parseInt(id));
  return {
    title: `${resource.title} | Temperinho`,
    description: resource.description,
    openGraph: {
      images: [
        {
          url: resource.image?.url ?? '/images/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

### Sitemap (`src/app/sitemap.ts`)

Busca todos os IDs de receitas e posts da API para gerar URLs dinâmicas. Fallback para apenas páginas estáticas se API falhar.

### Robots (`src/app/robots.ts`)

Permite tudo exceto `/usuario/` e `/auth/`. Referencia sitemap.xml.

---

## Gerenciamento de Estado

| Estado              | Solução                                                   |
| ------------------- | --------------------------------------------------------- |
| Autenticação global | `AuthContext` (React Context + useState)                  |
| Filtros de listagem | URL searchParams (persistência + linkabilidade)           |
| Estado de UI local  | useState em Client Components                             |
| Estado otimista     | useState local com rollback em catch                      |
| Cache de dados      | Nenhum (revalidação via router.refresh() ou Suspense key) |

**Sem** Zustand, Redux, ou react-query. Simplicidade intencional.

---

## Monitoramento

Sentry configurado em 3 runtimes:

| Arquivo                     | Runtime | Config                    |
| --------------------------- | ------- | ------------------------- |
| `sentry.server.config.ts`   | Node.js | `profilesSampleRate: 1.0` |
| `sentry.edge.config.ts`     | Edge    | Básico                    |
| `instrumentation-client.ts` | Browser | Replay + Feedback widget  |

`global-error.tsx` captura erros React não tratados.  
`onRequestError` em `instrumentation.ts` captura erros de request server.

---

## Build e Deploy

### Dockerfile (multistage)

1. `deps` — instala `node_modules` de produção
2. `builder` — copia deps + código, executa `npm run build`
3. `runner` — copia `.next/`, `public/`, `node_modules/` da build; usuário não-root

### Docker Compose (desenvolvimento)

```yaml
volumes:
  - .:/app # hot-reload
  - /app/node_modules # preserva node_modules do container
command: npm run dev
```

### Variáveis de Ambiente Requeridas

```
NEXT_PUBLIC_API_URL          # URL da API Laravel
NEXT_PUBLIC_URL              # URL pública do site (sitemap, og)
NEXT_PUBLIC_GOOGLE_AD_CLIENT # ca-pub-xxx
NEXT_PUBLIC_GOOGLE_AD_SLOT_* # slots por posição (8 slots)
SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN
SENTRY_AUTH_TOKEN
NEXT_PUBLIC_SENTRY_ORG
NEXT_PUBLIC_SENTRY_PROJECT
NEXT_RUNTIME                 # nodejs
```

---

## Security Headers

Configurados em `next.config.ts` para todas as rotas (`/:path*`):

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
```
