# ui-ux-skills.md — Temperinho UI/UX

Guia de interface e experiência do usuário para o projeto Temperinho.

---

## Identidade Visual

### Estética

O Temperinho tem identidade **warm & organic** — calorosa, inclusiva, levemente artesanal. Evoca uma cozinha aconchegante sem ser rústica ou ultrapassada. Tipografia editorial com serifa (Playfair Display) combina com corpo limpo (Inter) para credibilidade + calor.

### Paleta de Cores

| Token              | Valor HSL                         | Uso                                  |
| ------------------ | --------------------------------- | ------------------------------------ |
| `primary`          | `hsl(159 30% 35%)` (sage escuro)  | CTAs principais, links, foco         |
| `accent`           | `hsl(24 70% 55%)` (sunset)        | Destaques, badges, alertas positivos |
| `background`       | `hsl(30 40% 98%)` (creme)         | Fundo de página                      |
| `card`             | `hsl(30 40% 98%)`                 | Superfícies de card                  |
| `muted`            | `hsl(25 30% 90%)`                 | Backgrounds secundários, skeletons   |
| `foreground`       | `hsl(30 20% 15%)` (marrom escuro) | Texto principal                      |
| `muted-foreground` | `hsl(30 10% 40%)`                 | Texto secundário, placeholders       |
| `destructive`      | `hsl(0 70% 45%)`                  | Erros, ações destrutivas             |
| `sage-600`         | `hsl(95 25% 40%)`                 | Links em texto, variante de primary  |
| `warm-*`           | Escala de bege/marrom             | Backgrounds de seção                 |
| `sunset-500`       | `hsl(24 90% 60%)`                 | Newsletter, CTAs laranja             |

**Dark mode** suportado via `.dark` class (next-themes). Tokens se adaptam automaticamente.

### Tipografia

```
font-display  →  Playfair Display (headings h1-h3, títulos de seção, logotipo)
font-sans     →  Inter (corpo, labels, UI)
```

**Hierarquia padrão:**

- H1: `text-4xl md:text-5xl font-display font-bold`
- H2 de seção: `text-3xl md:text-4xl font-display font-bold`
- H3 de card: `text-xl font-semibold` ou `text-lg font-semibold`
- Body: `text-base` / `text-sm text-muted-foreground`
- Labels: `text-sm font-medium`

---

## Sistema de Componentes

### Botões (`src/components/ui/button.tsx`)

| Variant               | Uso                                      |
| --------------------- | ---------------------------------------- |
| `default`             | CTA primário (bg-primary)                |
| `secondary`           | CTA secundário (bg-secondary)            |
| `outline`             | Ação terciária, filtros ativos           |
| `ghost`               | Ações discretas, ícones                  |
| `destructive`         | Deletar, cancelar com confirmação        |
| `destructive-outline` | Deletar menos agressivo (cards de lista) |
| `link`                | Links em texto corrido                   |

**Tamanhos:** `sm` (h-9), `default` (h-10), `lg` (h-11), `icon` (h-10 w-10)

### Cards (`src/components/ui/card.tsx`)

- `variant="default"` — com sombra suave (padrão)
- `variant="flat"` — sem sombra, borda mais fraca

Estrutura: `Card > CardHeader > CardTitle + CardDescription | CardContent | CardFooter`

### Badges

- `default` — primary (destaque, selecionado)
- `secondary` — categorias, tags neutras
- `destructive` — status de erro
- `outline` — neutro com borda

### Formulários

Padrão obrigatório:

```tsx
<div className='space-y-2'>
  <Label htmlFor='campo'>Rótulo</Label>
  <Input id='campo' {...register('campo')} aria-invalid={!!errors.campo} />
  {errors.campo && (
    <p className='text-sm text-destructive mt-1' role='alert'>
      {errors.campo.message}
    </p>
  )}
</div>
```

Campos de senha sempre com botão toggle de visibilidade (Eye/EyeOff).

---

## Padrões de Layout

### Páginas Públicas

```
Header (sticky, backdrop-blur)
│
├── Hero/Banner da página
│   └── bg-muted/50 py-12 → título + subtítulo centralizado
│
├── Conteúdo principal
│   └── container mx-auto px-4
│
├── MarketingSection (AdBanner + Google AdSense)
│
└── Footer
```

### Grids de Cards

- 3 colunas: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Cards com hover: `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`

### Layout com Sidebar (área /usuario)

```
[Sidebar 256px] [Conteúdo flex-1]
```

Mobile: sidebar via Sheet (offcanvas) com botão fixo.

### Layout de Detalhe (receita/post)

```
[Imagem 50%] [Informações 50%]  ← grid lg:grid-cols-2
─────────────────────────────
[Conteúdo/Tabs]  [AdBanner sidebar lg:w-80 sticky]
─────────────────────────────
CommentsSection
MarketingSection
```

---

## Padrões de UX

### Loading States

| Contexto             | Solução                                           |
| -------------------- | ------------------------------------------------- |
| Páginas inteiras     | `<Suspense fallback={<PageSkeleton />}>`          |
| Grids de cards       | `<CardSkeleton />` × N                            |
| Botão de submit      | `disabled + <Loader2 className="animate-spin" />` |
| Categorias em filtro | `<Skeleton className="h-10 w-full" />`            |
| Avatar/imagem        | `<AvatarFallback>` com inicial                    |

### Feedback de Ação

- **Sucesso**: `toast.success('Mensagem.')` (Sonner, top-right)
- **Erro**: `toast.error('Mensagem de erro.')` com mensagem da API quando disponível
- **Loading de toast**: `toast.loading()` + `toast.dismiss()` para operações de card
- **Confirmação destrutiva**: sempre usar `AlertDialog` (nunca `confirm()` do browser)

### Formulários de Criação/Edição

1. Validação inline em tempo real (Zod + RHF)
2. Botão submit desabilitado durante `isSubmitting`
3. Redirect automático após sucesso com `router.push()` + `router.refresh()`
4. Preview de imagem antes do upload com `URL.createObjectURL()`
5. Cleanup de blob URL no `useEffect` de cleanup

### Filtros e Busca

- Busca: debounce de 500ms (`useDebouncedCallback`)
- Filtros: persistidos na URL via `searchParams` (linkável, compartilhável, SEO)
- Suspense com `key={suspenseKey}` para re-renderizar ao mudar filtros
- "Carregar mais" com `useTransition` (sem loading bloqueante)

### Favoritos (Optimistic UI)

```tsx
const originalState = isFavorited;
setIsFavorited(!originalState); // otimista
try {
  await toggleFavorite(id);
} catch {
  setIsFavorited(originalState); // rollback
}
```

---

## Padrões de Animação

### Entradas de página (Framer Motion — apenas cliente)

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

### Grid de receitas com AnimatePresence

```tsx
<AnimatePresence>
  {recipes.map((recipe, index) => (
    <motion.div
      key={recipe.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    />
  ))}
</AnimatePresence>
```

### CSS puro (preferível para componentes simples)

- Hover de card: `transition-all duration-300 hover:shadow-lg hover:-translate-y-1`
- Imagem zoom: `transition-transform duration-300 group-hover:scale-105`
- Fade de background: `transition-colors`

---

## Acessibilidade

- Link "skip to content" no `layout.tsx` com `sr-only focus:not-sr-only`
- `<main id="main-content">` em toda página
- `aria-invalid={!!errors.campo}` em inputs com erro
- `aria-label` em botões icon-only (`aria-label="Editar receita"`)
- `aria-pressed` em botões toggle (favorito, view mode)
- `role="alert"` em mensagens de erro de formulário
- Radix UI: suporte a teclado e screen reader nativo em todos os componentes
- `<label>` sempre associado ao `id` do input

---

## Responsividade

| Breakpoint    | Comportamento                                      |
| ------------- | -------------------------------------------------- |
| mobile (< md) | 1 coluna, sidebar via Sheet, busca no menu         |
| tablet (md)   | 2 colunas em grids, sidebar ainda oculta           |
| desktop (lg)  | 3 colunas, sidebar visível, busca global no header |
| xl            | Container max-width                                |

Imagens com `sizes` adequado ao breakpoint:

- Cards em grid: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- Imagem de destaque full: `(max-width: 1024px) 100vw, 896px`
- Avatar: `48px` fixo

---

## Padrões de Empty State

```tsx
<div className='text-center py-16 border-2 border-dashed rounded-lg'>
  <IconComponent className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
  <h3 className='text-lg font-medium text-foreground'>
    Título do estado vazio
  </h3>
  <p className='text-muted-foreground mt-2 mb-6'>Mensagem explicativa.</p>
  <Button asChild>
    <Link href='/acao'>Call to action</Link>
  </Button>
</div>
```

---

## Internacionalização

- Idioma: **pt-BR** exclusivamente (`lang="pt-BR"` no `<html>`)
- Datas: sempre via `formatDate()` de `src/lib/dateUtils.ts` com locale ptBR
- Plurais: tratados manualmente (ex: `receita${count !== 1 ? 's' : ''}`)
- Moeda: `R$` com vírgula decimal (formato brasileiro)
