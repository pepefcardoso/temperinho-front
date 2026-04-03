# Temperinho — Frontend

> Interface pública construída com **Next.js 15** e **React 19** para a plataforma de culinária inclusiva Temperinho. Inclui o site institucional, blog, catálogo de receitas, área do usuário autenticado, sistema de comentários, avaliações e páginas legais.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Páginas e Rotas](#páginas-e-rotas)
- [Área do Usuário](#área-do-usuário)
- [Autenticação](#autenticação)
- [Renderização e Performance](#renderização-e-performance)
- [SEO e Metadados](#seo-e-metadados)
- [Marketing e Monetização](#marketing-e-monetização)
- [Internacionalização e Conformidade Legal](#internacionalização-e-conformidade-legal)
- [Monitoramento de Erros](#monitoramento-de-erros)
- [Acessibilidade](#acessibilidade)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## Visão Geral

O **Temperinho Frontend** é a interface pública da plataforma. Combina **Server-Side Rendering** para SEO e performance com **Client Components** para interatividade. A autenticação é baseada em contexto (`AuthContext`) com tokens Bearer persistidos via cookies, integrando com os provedores sociais (Google OAuth).

---

## Stack Tecnológica

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript 5 (modo `strict`) |
| UI Base | React 19 |
| Componentes | Radix UI (Dialog, Select, Checkbox, etc.) |
| Estilização | Tailwind CSS 4 (tema customizado `warm`/`sage`) |
| Animações | Framer Motion 12 |
| Tipografia | Inter + Playfair Display (Google Fonts) |
| Formulários | React Hook Form 7 + Zod 3 |
| HTTP | Axios 1 |
| Cookies | js-cookie 3 |
| Toasts | Sonner 2 |
| Contadores animados | react-countup 6 |
| Interseção/Scroll | react-intersection-observer 9 |
| Datas | date-fns 4 |
| Monitoramento | Sentry Next.js 10 |
| Tema claro/escuro | next-themes 0.4 |
| CMP (Cookies) | CookieYes |
| Anúncios | Google AdSense |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx           # Root Layout — providers, fonts, header, footer
│   ├── page.tsx             # Home Page
│   ├── globals.css          # Design tokens Tailwind (warm, sage, sunset)
│   ├── robots.ts            # Geração automática de robots.txt
│   ├── sitemap.ts           # Geração dinâmica de sitemap.xml
│   ├── not-found.tsx        # Página 404 customizada
│   ├── global-error.tsx     # Error boundary global com Sentry
│   │
│   ├── auth/                # Fluxo de autenticação (GuestGuard)
│   │   ├── layout.tsx       # GuestGuard — redireciona usuários logados
│   │   ├── login/           # Login com e-mail/senha e Google OAuth
│   │   ├── criar-conta/     # Registro com validação de idade (18+)
│   │   ├── esqueceu-senha/  # Solicitação de reset de senha
│   │   ├── redefinir-senha/ # Reset via token da URL
│   │   └── callback/        # Callback OAuth (recebe token, salva, redireciona)
│   │
│   ├── blog/
│   │   ├── page.tsx         # Listagem de posts com filtros e busca (SSR)
│   │   └── [id]/page.tsx    # Detalhe do post com comentários e anúncios
│   │
│   ├── receitas/
│   │   ├── page.tsx         # Listagem de receitas com filtros e busca (SSR + Client)
│   │   └── [id]/page.tsx    # Detalhe da receita com ingredientes, passos, comentários
│   │
│   ├── usuario/             # Área protegida (AuthGuard)
│   │   ├── layout.tsx       # AuthGuard + UserDashboardLayout (sidebar)
│   │   ├── dashboard/       # Painel do usuário com resumo
│   │   ├── perfil/          # Edição de perfil
│   │   ├── empresa/         # Gerenciamento da empresa do usuário
│   │   ├── receitas/        # Minhas receitas + criar/editar
│   │   ├── artigos/         # Meus artigos + criar/editar
│   │   └── favoritos/
│   │       ├── receitas/    # Receitas salvas
│   │       └── artigos/     # Artigos salvos
│   │
│   ├── contato/             # Formulário de contato
│   ├── marketing/           # Página de planos para anunciantes
│   ├── sobre-nos/           # Institucional com equipe e valores
│   ├── privacidade/         # Política de Privacidade (LGPD)
│   └── termos/              # Termos de Uso
│
├── components/              # Componentes React por domínio
├── context/
│   └── AuthContext.tsx      # Provider de autenticação global
├── lib/
│   ├── api/                 # Funções de fetch por domínio (client-side)
│   ├── api/*.server.ts      # Funções de fetch com token (server-side)
│   ├── schemas/             # Schemas Zod
│   └── data/                # Dados estáticos (equipe, valores, contato)
└── types/                   # Interfaces TypeScript por domínio
```

---

## Pré-requisitos

- Node.js 20+
- npm, yarn ou pnpm
- API do Temperinho em execução

---

## Instalação e Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/temperinho-front.git
cd temperinho-front

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Preencha as variáveis conforme descrito abaixo

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# URL pública do site (usada no sitemap e robots.txt)
NEXT_PUBLIC_SITE_URL=https://temperinho.com.br
NEXT_PUBLIC_URL=https://temperinho.com.br

# Google AdSense
NEXT_PUBLIC_GOOGLE_AD_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# Slots de anúncios por posição
NEXT_PUBLIC_GOOGLE_AD_SLOT_HOMEPAGE_BANNER=
NEXT_PUBLIC_GOOGLE_AD_SLOT_BLOG_LEADERBOARD=
NEXT_PUBLIC_GOOGLE_AD_SLOT_BLOG_DETAILS=
NEXT_PUBLIC_GOOGLE_AD_SLOT_RECIPE_DETAIL=
NEXT_PUBLIC_GOOGLE_AD_SLOT_RECIPES_LEADERBOARD=
NEXT_PUBLIC_GOOGLE_AD_SLOT_ABOUT_US=
NEXT_PUBLIC_GOOGLE_AD_SLOT_CONTACT_US=

# Sentry (monitoramento de erros)
SENTRY_DSN=https://xxxx@sentry.io/xxxxx
SENTRY_ORG=sua-org
SENTRY_PROJECT=temperinho-front
```

---

## Páginas e Rotas

### Página Inicial (`/`)
- `HeroSection` — banner principal com CTA
- `FeaturedRecipes` — 3 receitas mais recentes da API
- `BlogSection` — prévia dos artigos mais recentes
- `MarketingSection` — banner de anúncio + Google AdSense
- `NewsletterSection` — formulário de inscrição na newsletter

### Blog (`/blog`)
- Listagem de posts com filtro por categoria e busca full-text
- Filtros persistidos na URL via `searchParams` (linkável e indexável)
- Loading com `Suspense` + `CardSkeleton`
- Cada card exibe título, resumo, categoria, autor e data

### Detalhe de Post (`/blog/[id]`)
- Renderização no servidor com `generateMetadata` dinâmico (Open Graph)
- Imagem de destaque, conteúdo e tempo de leitura estimado
- Seção de comentários (`CommentsSection`) — carregamento client-side
- Banner de anúncio no sidebar e entre seções

### Receitas (`/receitas`)
- Filtros combinados: busca, categoria, dietas, ordenação
- Paginação com "carregar mais"
- Componente `RecipesPageClient` gerencia o estado de filtros e paginação
- Cada card exibe imagem, título, dificuldade, tempo e avaliação média

### Detalhe de Receita (`/receitas/[id]`)
- `RecipeHeader` — informações gerais (tempo, porções, dificuldade)
- `RecipeContent` — ingredientes com quantidades e passos numerados
- Seção de comentários e avaliações
- Suporte a favoritos (usuários autenticados)

### Contato (`/contato`)
- Formulário validado com Zod + React Hook Form
- Informações de contato estáticas (`lib/data/contact.ts`)

### Marketing / Anuncie Conosco (`/marketing`)
- Dados buscados via SSR
- `MarketingHero` — banner principal
- `PlansSection` — cards de planos para anunciantes (busca os 3 primeiros planos da API)
- CTA com link para contato

### Sobre Nós (`/sobre-nos`)
- Dados da equipe e valores buscados da API (SSR)
- `MissionSection`, `ValuesSection`, `TeamSection`
- CTA para receitas e contato

### Páginas Legais
- `/privacidade` — Política de Privacidade detalhada, com seções sobre LGPD, cookies (CookieYes), Google Analytics, Google AdSense, DPO e direitos dos titulares
- `/termos` — Termos de Uso com seções sobre planos pagos, direito de arrependimento (7 dias), rescisão, reajuste de preços, foro competente (Tubarão/SC)

---

## Área do Usuário

Acessível via `/usuario/*`. Toda a área é protegida pelo `AuthGuard`.

### Dashboard (`/usuario/dashboard`)
- Resumo do perfil com avatar e dados do usuário
- Últimas 3 receitas e últimos 3 artigos do usuário
- Atalhos para as principais seções

### Perfil (`/usuario/perfil`)
- `UserProfileClient` — edição de nome, e-mail, telefone, data de nascimento e foto de perfil
- Alteração de senha

### Empresa (`/usuario/empresa`)
- `CompanyClient` — criação ou edição da empresa vinculada ao usuário
- Upload de logo
- Visualização da assinatura ativa

### Minhas Receitas (`/usuario/receitas`)
- Listagem das receitas criadas pelo usuário
- Ações: editar, deletar
- Botão "Nova Receita" → `/usuario/receitas/nova`

### Criar/Editar Receita
- `/usuario/receitas/nova` — formulário completo de criação
- `/usuario/receitas/editar/[id]` — formulário pré-preenchido para edição

O `RecipeForm` gerencia:
- Dados básicos (título, descrição, tempo, porções, dificuldade)
- Seleção de categoria e dietas
- Lista dinâmica de ingredientes (adicionar/remover)
- Lista dinâmica de passos (adicionar/remover/reordenar)
- Upload de imagem com preview

### Meus Artigos (`/usuario/artigos`)
- Listagem dos artigos criados pelo usuário
- Botão "Novo Artigo" → `/usuario/artigos/novo`

O `ArticleForm` gerencia:
- Título, resumo, conteúdo (rich text)
- Seleção de categoria e tópicos
- Upload de imagem de destaque

### Favoritos
- `/usuario/favoritos/receitas` — receitas curtidas com opção de desfavoritar
- `/usuario/favoritos/artigos` — artigos curtidos
- Redirecionamento `/usuario/favoritos` → `/usuario/favoritos/artigos`

---

## Autenticação

O `AuthContext` disponibiliza em toda a aplicação:

```typescript
const { user, token, login, logout, register, setToken } = useAuth();
```

**Métodos:**

| Método | Descrição |
|---|---|
| `login({ email, password })` | Chama `POST /api/auth/login`, salva token no cookie |
| `register(data)` | Chama `POST /api/users`, salva token no cookie |
| `logout()` | Chama `POST /api/auth/logout`, remove cookie, redireciona |
| `setToken(token)` | Salva token diretamente (usado no callback OAuth) |

**Guards:**

- `AuthGuard` — redireciona para `/auth/login` se não autenticado
- `GuestGuard` — redireciona para `/usuario/dashboard` se já autenticado

**Fluxo OAuth:**
1. Usuário clica em "Entrar com Google"
2. Frontend chama `GET /api/auth/google/redirect` → recebe URL do Google
3. Redireciona para a URL do Google
4. Google redireciona para o backend (`/api/auth/google/callback`)
5. Backend redireciona para `/auth/callback?token=xxx`
6. `AuthCallbackPage` lê o token, chama `setToken()` e redireciona para `/usuario/dashboard`

**Funções server-side** (`lib/api/*.server.ts`):
Lêem o token do cookie do servidor e o incluem automaticamente no header `Authorization` para chamadas SSR.

---

## Renderização e Performance

| Rota | Estratégia | Motivo |
|---|---|---|
| `/` | SSR | Receitas recentes sempre atualizadas |
| `/blog` | SSR | SEO + filtros via `searchParams` |
| `/blog/[id]` | SSR | SEO + Open Graph dinâmico |
| `/receitas` | SSR + Client | SSR para dados iniciais, Client para paginação/filtros |
| `/receitas/[id]` | SSR | SEO + dados completos |
| `/sobre-nos` | SSR | Dados da equipe da API |
| `/marketing` | SSR + Suspense | Dados de planos da API |
| `/usuario/*` | Client (AuthGuard) | Dados privados do usuário |

O padrão utilizado é **Server Components com `Suspense`** — o servidor renderiza o shell da página imediatamente enquanto os dados assíncronos são carregados com fallbacks de skeleton.

---

## SEO e Metadados

### Metadados Estáticos
Páginas com conteúdo fixo definem `export const metadata: Metadata = { ... }` diretamente.

### Metadados Dinâmicos
Posts e receitas usam `generateMetadata` async para buscar título, descrição e imagem da API:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const recipe = await getRecipeById(id);
  return {
    title: `${recipe.title} | Temperinho`,
    openGraph: { images: [{ url: recipe.image?.url }] }
  };
}
```

### Sitemap Dinâmico (`/sitemap.xml`)
Gerado em `src/app/sitemap.ts`, inclui:
- Páginas estáticas com frequências de atualização configuradas
- Todas as receitas (`/receitas/[id]`) com `lastModified` do banco
- Todos os posts (`/blog/[id]`) com `lastModified` do banco

### Robots (`/robots.txt`)
Gerado em `src/app/robots.ts`:
- Permite rastreamento de todas as páginas públicas
- Bloqueia `/usuario/` e `/auth/`
- Referencia o sitemap

---

## Marketing e Monetização

### Google AdSense
Carregado via `<Script>` no `layout.tsx` com estratégia `afterInteractive`. Slots configurados por posição via variáveis de ambiente.

### Componente `MarketingSection`
Renderizado em múltiplas páginas (home, blog, receitas, sobre nós, contato). Exibe um `AdBanner` customizado e um slot do AdSense, com fallback gracioso se não configurado.

### Componente `AdBanner`
Banner interno para promover a página `/marketing` (anuncie conosco), com variantes `full` e `sidebar`.

---

## Internacionalização e Conformidade Legal

A aplicação é desenvolvida integralmente em **português do Brasil** (`lang="pt-BR"`). As páginas legais abordam:

**Política de Privacidade (`/privacidade`):**
- Conformidade com a **LGPD** (Lei nº 13.709/2018)
- Bases legais para o tratamento de dados
- Tratamento de dados sensíveis (restrições alimentares)
- Cookies gerenciados pelo **CookieYes** (banner de consentimento)
- Google Analytics e Google AdSense
- Direitos dos titulares
- Contato do DPO

**Termos de Uso (`/termos`):**
- Condições de uso da plataforma
- Licença de conteúdo do usuário
- Regras de conduta
- Planos pagos: contratação manual, vigência de 30 dias, sem renovação automática
- Direito de arrependimento (7 dias corridos na primeira contratação)
- Foro: Comarca de Tubarão, SC

---

## Monitoramento de Erros

Integrado com **Sentry** via `@sentry/nextjs`:
- `global-error.tsx` — captura erros não tratados do React
- `Sentry.getTraceData()` injetado nos metadados HTTP para rastreamento distribuído
- Configurado para funcionar tanto no servidor quanto no cliente

---

## Acessibilidade

- Link "Pular para o conteúdo principal" (`sr-only`) no `layout.tsx`
- `main` com `id="main-content"` em todas as páginas
- Atributos `aria-invalid`, `aria-label` nos formulários de autenticação
- Botões com `aria-label` descritivo (ex: "Mostrar senha" / "Esconder senha")
- Componentes Radix UI com suporte a teclado e screen readers por padrão

---

## Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Lint
npm run lint
```

---

## Licença

Distribuído sob licença MIT. Consulte `LICENSE` para mais informações.
