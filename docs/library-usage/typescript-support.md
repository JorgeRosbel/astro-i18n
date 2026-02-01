# TypeScript Support

## Table of Contents

- [With TypeScript Autocompletion](#with-typescript-autocompletion)
- [Without TypeScript](#without-typescript)

## With TypeScript Autocompletion

For the best experience, import your translation file and use it as a type:

```ts
import en from "i18n/en.json";

export type BaseLocaleSchema = typeof en
```

```astro
---
import { BaseLocaleSchema } from "...."
import { useI18n } from "@ariaskit/astro-i18n";

const { t, locale } = useI18n<BaseLocaleSchema>({ 
  ssg: { 
    astro: Astro 
  } 
});

// Now you get autocompletion for translation keys!
const title = t("title"); // ✅ Autocomplete works
const invalid = t("invalid.key"); // ❌ TypeScript error
---

<h1>{t("title")}</h1>
<p>{t("navigation.home")}</p>
```

## Without TypeScript

If you're not using TypeScript or prefer dynamic usage:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

const { t, locale } = useI18n({ 
  ssg: { 
    astro: Astro 
  } 
});
---

<h1>{t("title")}</h1>
<p>{t("navigation.home")}</p>
```
