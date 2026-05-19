# brief.md — Temperinho Frontend

## O Produto

**Temperinho** é uma plataforma de culinária inclusiva brasileira voltada para pessoas com restrições alimentares (veganos, celíacos, intolerantes à lactose, alérgicos, etc.). Combina catálogo de receitas, blog editorial, área de usuário autenticado e sistema de anúncios B2B para empresas do setor alimentício.

**URL de produção:** https://temperinho.com  
**API backend:** `NEXT_PUBLIC_API_URL` (Laravel, REST)  
**Repositório:** temperinho-front

---

## Objetivos de Negócio

1. **Comunidade** — usuários criam e compartilham receitas inclusivas
2. **Conteúdo editorial** — blog com artigos sobre alimentação especial
3. **Monetização** — Google AdSense + planos pagos para empresas anunciantes
4. **SEO** — tráfego orgânico via receitas e artigos indexados pelo Google
5. **B2B** — empresas contratam visibilidade (banners, artigos patrocinados)

---

## Usuários

| Perfil     | Descrição                                                      | Área principal                      |
| ---------- | -------------------------------------------------------------- | ----------------------------------- |
| Visitante  | Navega receitas e blog sem login                               | Público (`/`, `/receitas`, `/blog`) |
| Membro     | Usuário cadastrado, cria receitas e artigos, favorita conteúdo | `/usuario/*`                        |
| Anunciante | Empresa com plano pago, gerencia perfil empresarial            | `/usuario/empresa`                  |

Cadastro exige 18+ anos (validação de data de nascimento). Login via email/senha ou Google OAuth.

---

## Funcionalidades Principais

### Públicas (SSR — SEO)

- **Home** — Hero + receitas em destaque (últimas 3) + prévia do blog + newsletter
- **Receitas** — catálogo com filtros (busca, categoria, dietas, ordenação), paginação "carregar mais", alternância grid/lista
- **Detalhe de Receita** — ingredientes, passos, avaliação por estrelas, comentários, favoritar, compartilhar, imprimir
- **Blog** — listagem com filtro por categoria e busca full-text
- **Detalhe de Post** — conteúdo, tempo de leitura estimado, avaliação, comentários, salvar
- **Sobre Nós** — equipe, missão, valores (dados da API)
- **Marketing** — planos de anúncio (dados da API)
- **Contato** — formulário + informações de contato
- **Newsletter** — inscrição no footer e na seção dedicada
- **Legais** — `/privacidade` (LGPD) e `/termos` (com cláusulas de planos pagos)

### Autenticadas (`/usuario/*`)

- **Dashboard** — resumo do perfil, últimas receitas e artigos, atalhos
- **Perfil** — edição de nome, telefone, foto, senha
- **Empresa** — CRUD de empresa (CNPJ, logo, dados de contato, assinaturas)
- **Minhas Receitas** — listagem com filtros, editar, deletar, criar nova
- **Meus Artigos** — listagem com filtros, editar, deletar, criar novo
- **Favoritos** — receitas salvas e artigos salvos, com filtros
- **Criar/Editar Receita** — formulário completo (dados, imagem, dietas, ingredientes, passos)
- **Criar/Editar Artigo** — formulário completo (dados, categorias, tópicos, conteúdo, imagem)

### Auth (`/auth/*`)

- Login (email/senha + Google OAuth)
- Criar conta (com validação 18+ e aceitação de termos)
- Esqueceu senha
- Redefinir senha (via token da URL)
- Callback OAuth

---

## Integrações de Terceiros

| Serviço        | Propósito                    | Config                                            |
| -------------- | ---------------------------- | ------------------------------------------------- |
| Google OAuth   | Login social                 | Via backend redirect                              |
| Google AdSense | Monetização via anúncios     | `NEXT_PUBLIC_GOOGLE_AD_CLIENT` + slots por página |
| CookieYes      | Banner de consentimento LGPD | Script `beforeInteractive`                        |
| Sentry         | Monitoramento de erros       | `@sentry/nextjs` com replay e feedback            |
| Amazon S3      | Armazenamento de imagens     | `temperinho-caseiro.s3.amazonaws.com`             |
| Google Fonts   | Tipografia                   | Inter + Playfair Display                          |

---

## Requisitos Legais

- **LGPD** (Lei 13.709/2018): tratamento de dados com base legal explícita
- **Dados sensíveis**: restrições alimentares tratadas como dado de saúde (consentimento explícito)
- **Direito de arrependimento**: 7 dias corridos na primeira contratação de plano pago
- **Foro**: Comarca de Tubarão, SC
- **Menores**: plataforma exige 18+ para cadastro

---

## Métricas de Qualidade

- **Core Web Vitals**: SSR para todas as páginas públicas indexáveis
- **SEO**: `generateMetadata` dinâmico + sitemap.xml automático + robots.txt
- **Acessibilidade**: link "skip to content", aria-labels, Radix UI (a11y nativo)
- **Performance**: `next/image` com `fill` + `sizes`, `Suspense` com skeletons, lazy loading de ads
- **Segurança**: headers HTTP configurados (HSTS, CSP via X-Frame-Options, etc.)

---

## Ambiente de Desenvolvimento

```bash
npm run dev        # Turbopack
npm run build      # Build de produção
npm run lint       # ESLint + Prettier
```

**Node.js**: 20+  
**Docker**: Dockerfile multistage disponível para produção  
**Variáveis**: `.env.local` (ver `.env.example`)

---

## Decisões Arquiteturais Chave

1. **App Router** — não usa Pages Router; toda lógica de rota em `src/app/`
2. **Sem Server Actions** — toda mutação é via axios client-side (compatibilidade com API Laravel)
3. **Token duplo** — `localStorage` para client, cookie `AUTH_TOKEN` para SSR server-side
4. **FormData com `_method: PUT`** — Laravel não suporta `PUT` com multipart nativamente
5. **Tailwind v4** — configuração via `@theme` em CSS, sem `tailwind.config.js`
