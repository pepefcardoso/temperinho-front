#### Summary Table

| Priority   | Category      | File Path                                               | Issue                                  |
| ---------- | ------------- | ------------------------------------------------------- | -------------------------------------- |
| **Medium** | Accessibility | `src/components/recipe/forms/RecipeFormSteps.tsx`       | Missing `aria-label` on delete buttons |
| **Medium** | Accessibility | `src/components/recipe/forms/RecipeFormIngredients.tsx` | Missing `aria-label` on delete buttons |
| **Low**    | Skeleton      | `src/app/blog/page.tsx`                                 | Local skeleton duplication             |
| **Low**    | Component     | `src/components/navigation/Header.tsx`                  | ThemeToggle disabled                   |

---

#### Detailed Remediation Tasks

##### 3. Add ARIA Labels to Dynamic Forms (Medium)

**Location:** `src/components/recipe/forms/RecipeFormSteps.tsx` & `src/components/recipe/forms/RecipeFormIngredients.tsx`

- **Issue:** The "Trash" icon buttons used for removing items lack descriptive labels for Screen Readers.
- **Implementation:**

1. In `RecipeFormSteps.tsx`, find the `Trash2` button.
2. Add: `aria-label={`Remover passo ${index + 1}`}`.
3. In `RecipeFormIngredients.tsx`, find the `Trash2` button.
4. Add: `aria-label={`Remover ingrediente ${index + 1}`}`.

##### 4. Extract Blog Skeleton (Low)

**Location:** `src/app/blog/page.tsx`

- **Issue:** `PostListSkeleton` is defined locally, violating the rule of having a formal component for states.
- **Implementation:**

1. Create `src/components/skeletons/BlogSkeleton.tsx`.
2. Move the code from `PostListSkeleton` to this new file.
3. Import `BlogSkeleton` in `src/app/blog/page.tsx` and use it in the `Suspense` fallback.

##### 5. Enable Theme Toggle (Low)

**Location:** `src/components/navigation/Header.tsx`

- **Issue:** The `ThemeToggle` component is currently commented out, preventing users from accessing Dark Mode despite the project having full support in `globals.css`.
- **Implementation:**

1. Uncomment the `ThemeToggle` component import.
2. Place it within the `Header` layout in the top right area (beside the `UserNav`).
3. Verify that it correctly toggles the `dark` class on the `<html>` element.
