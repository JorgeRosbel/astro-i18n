# Language Detection

## Table of Contents

- [Detection Priority](#detection-priority)
- [Forcing a Specific Language](#forcing-a-specific-language)

## Detection Priority

The library automatically detects the current language using this priority:

1. **Explicit locale** in configuration
2. **Astro.currentLocale** (from Astro i18n routing)
3. **Astro.params.lang** (from dynamic routes)
4. **Fallback to "en"**

## Forcing a Specific Language

You can override the automatic detection:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import { BaseLocaleSchema } from "...."

// Force Spanish regardless of route
const { t, locale } = useI18n<BaseLocaleSchema>({ 
  ssg: { 
    astro: Astro,
    locale: "es" 
  } 
});
---

<h1>{t("title")}</h1>
<p>Forced language: {locale}</p>
```
