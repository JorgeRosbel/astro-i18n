# Strategy 1: Astro Built-in i18n Routing (Recommended)

## Table of Contents

- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Generated URLs](#generated-urls)
- [Advantages](#advantages)

Astro 5+ includes built-in internationalization routing support.

## Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: false, // /en/about vs /about
    }
  }
});
```

## File Structure

```
src/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   └── contact.astro
└── layouts/
    └── Layout.astro
```

## Usage

```astro
---
// src/pages/index.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";
import Layout from "../layouts/Layout.astro";

const { t, locale } = useI18n({ ssg: { astro: Astro } });
---

<Layout>
  <h1>{t("home.title")}</h1>
  <p>{t("home.description")}</p>
  <p>Current locale: {locale}</p>
</Layout>
```

## Generated URLs

- `/` - English (default)
- `/es/` - Spanish
- `/fr/` - French
- `/es/about` - Spanish about page
- `/fr/about` - French about page

## Advantages

- ✅ Automatic URL generation
- ✅ SEO-friendly URLs
- ✅ No manual `getStaticPaths` needed
- ✅ Built-in language detection
- ✅ Automatic hreflang generation
