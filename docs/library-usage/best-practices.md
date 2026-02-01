# Best Practices

## Table of Contents

- [Guidelines](#guidelines)
- [Complete Page Example](#complete-page-example)

## Guidelines

1. **Use TypeScript** for better autocompletion and error catching
2. **Organize translations** with logical nesting
3. **Keep keys consistent** across all language files
4. **Use descriptive keys** that reflect the content
5. **Test all languages** to ensure translations work correctly
6. **Use the CLI tool** to validate translation files

## Complete Page Example

```astro
---
// src/pages/index.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";
import Layout from "../layouts/Layout.astro";
import type { BaseLocaleSchema } from "..."

const { t, locale } = useI18n<BaseLocaleSchema>({ ssg: { astro: Astro } });
const userName = "World";
const itemCount = 42;
---

<Layout title="page.title">
  <main>
    <h1>{t("page.title")}</h1>
    <p>{t("page.subtitle")}</p>
    
    <section>
      <h2>{t("welcome.title")}</h2>
      <p>{t("welcome.message", { name: userName })}</p>
    </section>
    
    <section>
      <h2>{t("stats.title")}</h2>
      <p>{t("stats.items", { count: itemCount })}</p>
    </section>
    
    <nav>
      <a href="/">{t("navigation.home")}</a>
      <a href="/about">{t("navigation.about")}</a>
    </nav>
  </main>
</Layout>
```
