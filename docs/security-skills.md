# security-skills.md — Temperinho Security

Requisitos e padrões de segurança do projeto Temperinho.

---

## Modelo de Ameaças

O Temperinho é uma aplicação pública com área autenticada. Superfícies de risco:

1. **Autenticação**: token Bearer + OAuth; roubo de token via XSS
2. **Uploads de arquivo**: imagens de usuário (avatar, receita, empresa)
3. **Dados sensíveis**: restrições alimentares (dado de saúde, LGPD)
4. **Formulários públicos**: contato e newsletter (spam, abuso)
5. **Anúncios**: Google AdSense (third-party scripts)
6. **Pagamentos indiretos**: planos pagos contratados via contato manual (sem gateway no frontend)

---

## Autenticação e Tokens

### Armazenamento de Token

| Local               | Uso                        | Risco                                       |
| ------------------- | -------------------------- | ------------------------------------------- |
| `localStorage`      | Client-side axios requests | Acessível via XSS                           |
| Cookie `AUTH_TOKEN` | SSR server-side requests   | HTTPOnly não configurado (js-cookie acessa) |

**Mitigação atual**: Sentry captura exceções; app não tem eval() ou innerHTML dinâmico; Radix UI não usa dangerouslySetInnerHTML.

**Recomendação futura**: migrar para cookie HttpOnly gerenciado pelo servidor para eliminar acesso via JS.

### Expiração de Token

- Cookie: `expires: 7` dias
- Axios interceptor: status 401 → limpa localStorage + redireciona para login
- Não há refresh token implementado — logout automático após expiração

### OAuth Callback

```ts
// src/app/auth/callback/page.tsx
const token = searchParams.get('token');
if (token) {
  setToken(token);
  router.push('/usuario/dashboard');
} else {
  router.push('/auth/login?error=token-missing');
}
```

Token vem via query string — potencial exposição em logs de servidor/proxy. O backend deve usar redirect POST ou fragment (#) em produção.

---

## Headers de Segurança HTTP

Configurados em `next.config.ts` para todas as rotas:

```ts
{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
// → força HTTPS por 2 anos, inclui subdomínios

{ key: 'X-Content-Type-Options', value: 'nosniff' }
// → previne MIME sniffing

{ key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
// → limita dados de referrer cross-origin

{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }
// → previne clickjacking (iframes de outros domínios)
```

**Headers faltantes a considerar:**

- `Content-Security-Policy` — necessário, mas complexo com AdSense e CookieYes
- `Permissions-Policy` — bloquear câmera, microfone, etc.

---

## Upload de Arquivos

### Validações no Frontend (`CompanyForm.tsx`)

```ts
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
];

if (file.size > MAX_FILE_SIZE) {
  toast.error('O arquivo é muito grande. O tamanho máximo é 2MB.');
  return;
}
if (!ALLOWED_TYPES.includes(file.type)) {
  toast.error('Tipo de arquivo inválido.');
  return;
}
```

**Importante**: validação frontend é UX, não segurança. O backend Laravel deve revalidar MIME type real (não apenas extensão) e varredura de malware via S3.

### Blob URLs

Todos os previews de upload usam `URL.createObjectURL()` com cleanup:

```ts
useEffect(() => {
  return () => {
    if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
  };
}, [imagePreview]);
```

### Destino final

Imagens vão para S3 (`temperinho-caseiro.s3.amazonaws.com`). Servidas via HTTPS. O Next.js valida o hostname em `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'temperinho-caseiro.s3.amazonaws.com' },
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, // Google avatars
  ];
}
```

---

## Proteção de Rotas

### Guards de Componente

```
/usuario/* → AuthGuard → redireciona /auth/login se !user
/auth/*    → GuestGuard → redireciona /usuario/dashboard se isAuthenticated
```

Guards verificam `loading` antes de redirecionar para evitar flash.

### Server-side

Páginas do `/usuario/*` como `dashboard/page.tsx` chamam `getAuthenticatedUserProfile()` que lança erro se token ausente:

```ts
if (!token) throw new Error('Token de autenticação não encontrado');
```

Erros 401/403 redirecionam para `/auth/login?error=authentication-required`.

### Robots.txt

```
Disallow: /usuario/
Disallow: /auth/
```

Previne indexação de páginas privadas.

---

## LGPD — Lei 13.709/2018

### Dados coletados e bases legais

| Dado                   | Tipo                 | Base Legal                           | Local      |
| ---------------------- | -------------------- | ------------------------------------ | ---------- |
| Nome, email            | Pessoal              | Execução de contrato (Art. 7º, V)    | Cadastro   |
| Telefone               | Pessoal              | Execução de contrato                 | Perfil     |
| Data nascimento        | Pessoal              | Execução de contrato (validação 18+) | Cadastro   |
| Restrições alimentares | **Sensível** (saúde) | Consentimento explícito (Art. 11, I) | Perfil     |
| Dados de acesso/IP     | Pessoal              | Legítimo interesse (Art. 7º, IX)     | Automático |
| Cookies de análise     | Pessoal              | Consentimento (CookieYes)            | Automático |
| Cookies de publicidade | Pessoal              | Consentimento (CookieYes)            | Automático |

### Consentimento de Cookies

CookieYes gerencia consentimento via banner:

```html
<!-- layout.tsx -->
<script src="https://cdn-cookieyes.com/..." strategy="beforeInteractive" />
```

Categorias: Estritamente Necessários (sem consentimento) / Análise / Publicidade.

Link "Gerenciar Cookies" no footer: `<a href="#" className="cky-banner-revisit">`.

### Direitos dos Titulares

Implementados via suporte manual (email DPO: contato@temperinho.com.br). Sem fluxo automático no frontend — usuário solicita por email.

### Retenção

- Dados de conta: até 2 anos após encerramento
- Dados de uso/navegação identificáveis: até 6 meses
- DPO: Pedro Paulo Fernandes Cardoso

---

## Inputs e XSS

### Formulários

Todos os inputs passam por React Hook Form + Zod. Zod valida tipo e formato antes de enviar à API. Não há `dangerouslySetInnerHTML` em nenhum componente.

### Conteúdo de API

Conteúdo do blog/receitas é renderizado como texto:

```tsx
// blog/[id]/page.tsx
<p className='whitespace-pre-wrap'>{article.content ?? ''}</p>
```

Não há uso de `dangerouslySetInnerHTML` para conteúdo gerado por usuário. Sem rich text editor no frontend atual (textarea puro).

---

## Dependências de Terceiros

### Scripts externos carregados

| Script         | Origem                        | Estratégia                                 |
| -------------- | ----------------------------- | ------------------------------------------ |
| CookieYes      | cdn-cookieyes.com             | `beforeInteractive` (necessário para LGPD) |
| Google AdSense | pagead2.googlesyndication.com | `afterInteractive`                         |

### Análise de risco

- Scripts `beforeInteractive` têm acesso total ao DOM antes da hydration — CookieYes é confiável mas crítico
- AdSense carregado com `crossOrigin="anonymous"` e `async`
- `rel="noopener noreferrer"` em todos os links `target="_blank"` externos

---

## Ambiente de Produção

### Docker

Container roda com usuário não-root:

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

### Variáveis Sensíveis

- `SENTRY_AUTH_TOKEN` — nunca exposto ao browser (sem `NEXT_PUBLIC_`)
- `SENTRY_DSN` — versão server sem `NEXT_PUBLIC_` + versão client com
- Nenhuma credencial de banco/S3 no frontend

### NODE_ENV

```
ENV NODE_ENV production
```

Desativa React DevTools, habilita otimizações de build, ativa `secure: true` nos cookies.

---

## Checklist de Segurança para Novos Features

- [ ] Inputs validados com Zod antes de enviar à API
- [ ] Uploads: validar tamanho e MIME type no cliente
- [ ] Nenhum `dangerouslySetInnerHTML` com conteúdo de usuário
- [ ] Links externos: `rel="noopener noreferrer"` + `target="_blank"`
- [ ] Rotas privadas protegidas por AuthGuard no layout
- [ ] Server-side: verificar token antes de chamar API autenticada
- [ ] Dados sensíveis: nunca logar tokens ou dados pessoais no console em produção
- [ ] Imagens remotas: adicionar hostname ao `remotePatterns` do `next.config.ts`
- [ ] Novos scripts de terceiros: avaliar `beforeInteractive` vs `afterInteractive`
