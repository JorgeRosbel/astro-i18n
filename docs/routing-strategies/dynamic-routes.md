# Strategy 2: Dynamic Routes with `[lang]` Parameter

## Table of Contents

- [File Structure](#file-structure)
- [Implementation](#implementation)
- [Generated URLs](#generated-urls)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

Use dynamic route parameters to specify the language.

## File Structure

```
src/
├── pages/
│   └── [lang]/
│       ├── index.astro
│       ├── about.astro
│       └── contact.astro
└── layouts/
    └── Layout.astro
```

## Implementation

```astro
---
// src/pages/[lang]/index.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";
import type { GetStaticPaths } from "astro";

export const getStaticPaths = (() => {
  return [
    { params: { lang: "en" } },
    { params: { lang: "es" } },
    { params: { lang: "fr" } }
  ];
}) satisfies GetStaticPaths;

const { t, locale } = useI18n({ ssg: { astro: Astro } });
---

<html lang={locale}>
<head>
  <title>{t("home.title")}</title>
</head>
<body>
  <h1>{t("home.title")}</h1>
  <p>{t("home.description")}</p>
  <p>Language: {locale}</p>
</body>
</html>
```

## Generated URLs

- `/en/` - English
- `/es/` - Spanish
- `/fr/` - French
- `/en/about` - English about page
- `/es/about` - Spanish about page

## Advantages

- ✅ Explicit language in URL
- ✅ Full control over routing
- ✅ Works with all Astro versions
- ✅ Easy to understand

## Disadvantages

- ❌ Manual `getStaticPaths` required
- ❌ More boilerplate code
