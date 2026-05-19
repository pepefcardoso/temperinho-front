# CLAUDE.md — Temperinho Frontend

Instruções para Claude ao trabalhar neste projeto.

---

## Identidade do Projeto

**Temperinho** é um frontend Next.js 15 (App Router) para uma plataforma de culinária inclusiva brasileira. O site é voltado para pessoas com restrições alimentares. Todo conteúdo é em **português do Brasil**.

---

## Stack Obrigatória

| Camada         | Tecnologia                                              |
| -------------- | ------------------------------------------------------- |
| Framework      | Next.js 15 App Router                                   |
| Linguagem      | TypeScript 5 strict                                     |
| Estilização    | Tailwind CSS 4 (v4, config via `@theme` em globals.css) |
| Componentes UI | Radix UI + shadcn/ui pattern (ver `src/components/ui/`) |
| Variantes      | `class-variance-authority` (cva)                        |
| Ícones         | `lucide-react`                                          |
| Formulários    | React Hook Form + Zod                                   |
| HTTP           | Axios via `src/lib/axios.ts` (client-side)              |
| Auth           | Cookie `AUTH_TOKEN` via `src/context/AuthContext.tsx`   |
| Toasts         | Sonner (`toast.success`, `toast.error`)                 |
| Animações      | Framer Motion (páginas de receitas), CSS otherwise      |
| Datas          | `date-fns` com locale `ptBR` via `src/lib/dateUtils.ts` |

---

## Regras de Código

### Geral

- **Nunca** usar `<form>` HTML direto — sempre React Hook Form com `handleSubmit`
- **Nunca** usar `localStorage` em Server Components ou em artefatos (usar cookies via `js-cookie`)
- **Sempre** usar `cn()` de `src/lib/utils.ts` para classes condicionais
- **Sempre** tipar com TypeScript — sem `any` explícito
- Imports com alias `@/` para tudo em `src/`

### Server Components vs Client Components

- Server Components: páginas SSR, busca de dados, `generateMetadata`
- Client Components: `'use client'` obrigatório no topo quando usar hooks, eventos, estado
- Padrão: page.tsx como Server Component → passa dados para `*Client.tsx`
- `export const dynamic = 'force-dynamic'` em páginas com dados privados do usuário

### API

- Client-side: `src/lib/axios.ts` (token via interceptor do localStorage)
- Server-side: criar instância axios com cookie `AUTH_TOKEN` diretamente (ver `src/lib/api/*.server.ts`)
- Formato de resposta da API: `{ data: T }` para recursos únicos, `PaginatedResponse<T>` para listas
- FormData + `_method: 'PUT'` para updates com upload de arquivo

### Componentes

- Variantes de componente via `cva()` — nunca ternários inline longos
- Skeletons em `src/components/skeletons/`
- Guards em `src/components/guards/` (`AuthGuard`, `GuestGuard`)
- Server Actions **não** usadas — toda mutação via axios client-side

### Formulários

- Schema Zod em `src/lib/schemas/`
- `zodResolver` para React Hook Form
- Sempre mostrar erros inline com `role="alert"`
- FormData para uploads de arquivo com `Content-Type: multipart/form-data`

### Rotas Protegidas

- Área `/usuario/*` envolve com `AuthGuard` via layout
- Área `/auth/*` envolve com `GuestGuard` via layout
- Redirecionar com `router.push()` ou `redirect()` do next/navigation

---

## Tokens de Design

Cores do tema em `src/app/globals.css` via `@theme`. **Nunca** usar cores Tailwind brutas para cores semânticas — usar os tokens:

```
bg-background / text-foreground
bg-card / text-card-foreground
bg-primary / text-primary-foreground
bg-muted / text-muted-foreground
bg-secondary / text-secondary-foreground
text-destructive / border-destructive
border-border
ring-ring
```

Paletas customizadas disponíveis: `warm-*`, `sage-*`, `sunset-*`.

Fontes: `font-sans` (Inter via `--font-inter`) e `font-display` (Playfair Display via `--font-display`).

---

## Padrões de Página

### Página SSR com filtros

```tsx
// page.tsx (Server Component)
export default async function Page({ searchParams }) {
  const sp = await searchParams;
  const data = await fetchData(sp);
  return <ClientComponent initialData={data} />;
}
```

### Página com Suspense

```tsx
<Suspense key={suspenseKey} fallback={<PageSkeleton />}>
  <AsyncDataComponent searchParams={sp} />
</Suspense>
```

### Componente Client com filtros na URL

```tsx
const router = useRouter();
const searchParams = useSearchParams();
// Atualizar params sem re-render total:
const params = new URLSearchParams(Array.from(searchParams.entries()));
params.set('key', value);
router.push(`${pathname}?${params.toString()}`);
```

---

## Padrões de Formulário

```tsx
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { ... }
});

const onSubmit = async (data: FormData) => {
  try {
    await apiCall(data);
    toast.success('Sucesso!');
    router.push('/destino');
  } catch (error) {
    const msg = isAxiosError(error) ? error.response?.data?.message : 'Erro desconhecido';
    toast.error(msg || 'Erro ao processar.');
  }
};
```

---

## Estrutura de Arquivos

```
src/
├── app/                    # Rotas Next.js App Router
│   ├── layout.tsx          # Root layout (providers, fonts, header, footer)
│   ├── globals.css         # Tokens Tailwind v4 (@theme)
│   └── [rota]/
│       ├── page.tsx        # Server Component (SSR)
│       └── layout.tsx      # Layout de segmento
├── components/
│   ├── ui/                 # Componentes base (shadcn pattern)
│   ├── [domínio]/          # Componentes por domínio
│   ├── guards/             # AuthGuard, GuestGuard
│   ├── navigation/         # Header, Footer
│   └── skeletons/          # Loading skeletons
├── context/
│   └── AuthContext.tsx     # Provider de auth global
├── hooks/                  # Hooks customizados
├── lib/
│   ├── api/                # Funções de API por domínio
│   ├── axios.ts            # Cliente axios configurado
│   ├── schemas/            # Schemas Zod
│   ├── data/               # Dados estáticos
│   ├── config/site.ts      # Links de navegação
│   └── utils.ts            # cn()
└── types/                  # Interfaces TypeScript
```

---

## Checklist ao Criar Componente

- [ ] `'use client'` quando necessário
- [ ] Tipagem TypeScript completa (sem `any`)
- [ ] Usar tokens de cor semânticos (não cores diretas)
- [ ] `cn()` para classes condicionais
- [ ] Estados de loading com Skeleton ou Loader2 (lucide)
- [ ] Tratamento de erro com toast.error
- [ ] `aria-label` em botões sem texto visível
- [ ] `role="alert"` em mensagens de erro de formulário

## Checklist ao Criar Página

- [ ] `generateMetadata` se SSR com conteúdo dinâmico
- [ ] `notFound()` para recursos inexistentes
- [ ] `Suspense` com fallback adequado para dados assíncronos
- [ ] `<main id="main-content">` se for layout raiz
- [ ] SEO: título, descrição, og:image configurados
