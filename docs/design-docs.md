# design-docs.md — Temperinho Design System

Documentação do sistema de design implementado em `src/app/globals.css` e `src/components/ui/`.

---

## Fundação

### Tailwind CSS v4

O projeto usa Tailwind v4 com configuração via `@theme` no CSS — sem `tailwind.config.js`:

```css
/* src/app/globals.css */
@import 'tailwindcss';

@theme {
  --color-primary: hsl(159 30% 35%);
  /* ... todos os tokens aqui */
}
```

Classes geradas automaticamente a partir dos tokens: `bg-primary`, `text-primary`, `border-primary`, etc.

### PostCSS

```js
// postcss.config.mjs
"@tailwindcss/postcss": {
  plugins: [tailwindcssAnimate],  // animações de accordion, dialog, etc.
}
```

---

## Tokens de Cor

### Semânticos (modo claro → modo escuro automático)

```css
/* Fundo e superfícies */
--color-background:   hsl(30 40% 98%)   → hsl(30 15% 8%)
--color-card:         hsl(30 40% 98%)   → hsl(30 15% 10%)
--color-popover:      hsl(30 40% 98%)   → hsl(30 15% 8%)

/* Texto */
--color-foreground:           hsl(30 20% 15%)   → hsl(30 30% 92%)
--color-card-foreground:      hsl(30 20% 15%)   → hsl(30 30% 92%)
--color-muted-foreground:     hsl(30 10% 40%)   → hsl(30 15% 65%)

/* Ação primária — sage verde */
--color-primary:              hsl(159 30% 35%)  → hsl(159 40% 65%)
--color-primary-foreground:   hsl(30 40% 98%)   → hsl(30 15% 8%)

/* Secundário — bege quente */
--color-secondary:            hsl(25 35% 85%)   → hsl(30 10% 15%)
--color-secondary-foreground: hsl(30 20% 15%)   → hsl(30 30% 92%)

/* Muted — fundo suave */
--color-muted:                hsl(25 30% 90%)   → hsl(30 10% 12%)

/* Accent — laranja sunset */
--color-accent:               hsl(24 70% 55%)   → hsl(24 60% 60%)
--color-accent-foreground:    hsl(30 40% 98%)   → hsl(30 15% 8%)

/* Destrutivo */
--color-destructive:          hsl(0 70% 45%)    → hsl(0 62.8% 30.6%)

/* Bordas e inputs */
--color-border:               hsl(25 20% 85%)   → hsl(30 10% 18%)
--color-input:                hsl(25 20% 85%)   → hsl(30 10% 18%)
--color-ring:                 hsl(159 30% 35%)  → hsl(159 40% 65%)
```

### Paleta Sage (verde sálvia)

```
sage-50:  hsl(95 25% 95%)   sage-100: hsl(95 25% 90%)
sage-200: hsl(95 25% 80%)   sage-300: hsl(95 25% 70%)
sage-400: hsl(95 20% 60%)   sage-500: hsl(95 20% 50%)
sage-600: hsl(95 25% 40%)   ← links, ações secundárias
sage-700: hsl(95 30% 30%)   sage-800: hsl(95 35% 20%)
sage-900: hsl(95 40% 10%)
```

### Paleta Warm (bege/marrom)

```
warm-50:  hsl(30 20% 95%)   warm-100: hsl(30 20% 90%)
warm-200: hsl(30 15% 85%)   warm-300: hsl(30 15% 75%)
warm-400: hsl(30 15% 65%)   warm-500: hsl(30 10% 55%)
warm-700: hsl(30 10% 40%)   warm-800: hsl(30 15% 25%)
warm-900: hsl(30 20% 15%)   ← texto principal (páginas legais)
```

### Paleta Sunset (laranja)

```
sunset-500: hsl(24 90% 60%)  ← newsletter CTA, destaques
sunset-600: hsl(20 90% 55%)
```

### Sidebar (área /usuario)

```
--color-sidebar-background:           hsl(30 35% 95%)  → hsl(30 10% 5%)
--color-sidebar-foreground:           hsl(30 15% 25%)  → hsl(30 25% 85%)
--color-sidebar-primary:              hsl(159 30% 35%) → hsl(159 40% 65%)
--color-sidebar-accent:               hsl(25 25% 88%)  → hsl(30 8% 12%)
--color-sidebar-border:               hsl(25 20% 82%)  → hsl(30 8% 15%)
```

---

## Tipografia

### Fontes

```ts
// src/app/layout.tsx
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
});
```

### Classes

```
font-sans     → Inter    → corpo, labels, UI geral
font-display  → Playfair Display → headings, logotipo, títulos de seção
```

CSS:

```css
body {
  @apply bg-background text-foreground font-sans;
}
.font-display {
  font-family: 'Playfair Display', serif;
}
```

### Escala de Tamanhos

| Uso                | Classes Tailwind                                  |
| ------------------ | ------------------------------------------------- |
| H1 de página       | `text-4xl md:text-5xl font-display font-bold`     |
| H1 de detalhe      | `text-3xl md:text-4xl font-display font-bold`     |
| H2 de seção        | `text-3xl md:text-4xl font-display font-bold`     |
| H2 de card header  | `text-2xl font-semibold`                          |
| H3 de card         | `text-xl font-semibold` / `text-lg font-semibold` |
| Subtitle de página | `text-lg md:text-xl text-muted-foreground`        |
| Body default       | `text-base text-foreground`                       |
| Body muted         | `text-sm text-muted-foreground`                   |
| Label              | `text-sm font-medium`                             |
| Caption/meta       | `text-xs text-muted-foreground`                   |

---

## Border Radius

```css
--radius-lg: 0.75rem   → rounded-xl
--radius-md: calc(0.75rem - 2px)  → rounded-lg (aprox)
--radius-sm: calc(0.75rem - 4px)  → rounded-md (aprox)
```

Cards usam `rounded-xl`. Inputs `rounded-md`. Buttons `rounded-md` padrão, `rounded-full` para filtros de dieta e busca.

---

## Espaçamento de Seções

| Contexto           | Padding                     |
| ------------------ | --------------------------- |
| Hero de página     | `py-12` / `py-16`           |
| Seções de conteúdo | `py-12` / `py-16`           |
| Seções de CTA      | `py-16`                     |
| Cards internos     | `p-4 md:p-6` / `p-6 sm:p-8` |

Container padrão: `container mx-auto px-4`  
Container estreito: `max-w-4xl mx-auto`  
Container largo: `max-w-6xl mx-auto`

---

## Componentes Base

### Button

Variantes via CVA em `src/components/ui/button.tsx`:

```
default           → bg-primary text-primary-foreground hover:bg-primary/90
destructive       → bg-destructive text-destructive-foreground
outline           → border border-input bg-background hover:bg-accent
secondary         → bg-secondary text-secondary-foreground hover:bg-secondary/80
ghost             → hover:bg-accent hover:text-accent-foreground
link              → text-primary underline-offset-4 hover:underline
destructive-outline → border border-destructive bg-transparent text-destructive hover:bg-destructive/10
```

Todos com: `focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50`

### Input

```
h-10 rounded-md border border-input bg-background
focus-visible:ring-2 focus-visible:ring-ring
placeholder:text-muted-foreground
```

### Card

```
rounded-xl border bg-card text-card-foreground
variant="default" → shadow-sm
variant="flat"    → shadow-none border-border/70
```

### Badge

```
rounded-full border px-2.5 py-0.5 text-xs font-semibold

default      → bg-primary text-primary-foreground
secondary    → bg-secondary text-secondary-foreground
destructive  → bg-destructive text-destructive-foreground
outline      → text-foreground (sem background)
```

### Avatar

```
rounded-full overflow-hidden
size="sm"      → h-8 w-8
size="default" → h-10 w-10
size="lg"      → h-16 w-16
```

Fallback: `bg-muted text-muted-foreground` com inicial do nome.

---

## Padrões de Superfície

### Seção com background alternado

```
bg-background  → seções principais
bg-card        → seções de destaque claro
bg-muted/50    → hero/banner de página, filtros
bg-primary     → CTA seção (ex: newsletter com sage)
```

### Cards com hover

```tsx
className="bg-card rounded-xl overflow-hidden shadow-sm
           hover:shadow-lg transition-all duration-300 border border-border
           hover:-translate-y-1"
```

### Seção de destaque sage (newsletter)

```tsx
className = 'bg-gradient-to-r from-sage-600 to-sage-700';
// Texto branco: text-white / text-sage-100 / text-sage-200
```

### Hero do site

```tsx
className="bg-gradient-to-br from-warm-50 via-sage-50 to-sunset-50
           dark:from-warm-900/20 dark:via-sage-900/20 dark:to-sunset-900/20"
// Blobs decorativos:
className="absolute top-10 left-10 w-20 h-20 bg-sage-300 rounded-full blur-2xl opacity-10"
```

---

## Ícones

Exclusivamente `lucide-react`. Tamanhos padrão:

```
h-4 w-4 → dentro de botões, labels
h-5 w-5 → nav, ações de lista
h-6 w-6 → features, empty state pequeno
h-8 w-8 → spinner de loading
h-10 w-10 → avatar fallback
h-12 w-12 → empty state grande, error state
```

Spinner de loading: `<Loader2 className="animate-spin" />`

---

## Padrões de Imagem

Sempre `next/image` com `fill` + `sizes`. Nunca `<img>` puro.

```tsx
// Imagem de capa com fill
<div className="relative w-full aspect-video rounded-xl overflow-hidden">
  <Image src={url} alt={title} fill className="object-cover" sizes="..." priority />
</div>

// Avatar circular
<div className="relative w-12 h-12 rounded-full overflow-hidden">
  <Image src={url} alt={name} fill className="object-cover" sizes="48px" />
</div>
```

Placeholder: `/images/placeholder.png` para imagens ausentes.  
Avatar placeholder: `/images/avatar-placeholder.png`.

---

## Dark Mode

Implementado via `next-themes` com `attribute="class"`. A classe `.dark` no `<html>` ativa os tokens de dark.

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
```

`ThemeToggle` existe em `src/components/theme/ThemeToggle.tsx` mas está **comentado** no Header (feature oculta temporariamente).

---

## Animações CSS

```css
/* tailwindcss-animate (via PostCSS) */
animate-accordion-down / animate-accordion-up  → Accordion
animate-in / animate-out + fade-in-0 / fade-out-0 / zoom-in-95 → Dialog, Popover
```

Transições de componentes:

```
transition-all duration-300   → cards, hover effects
transition-colors              → links, botões
transition-transform duration-300  → imagens com zoom
```

---

## Padrão de Skeleton

```tsx
// src/components/ui/skeleton.tsx
<div className="animate-pulse rounded-md bg-muted" />

// Uso em CardSkeleton
<Skeleton className="h-48 w-full rounded-t-xl" />  // imagem
<Skeleton className="h-6 w-3/4" />                  // título
<Skeleton className="h-4 w-full" />                 // linha de texto
```

Regra: cada componente real tem um Skeleton correspondente para estados de carregamento com `<Suspense>`.
