# Basic Usage

## Table of Contents

- [Importing the Library](#importing-the-library)
- [SSG (Static Site Generation) Usage](#ssg-static-site-generation-usage)
- [SSR (Server-Side Rendering) Usage](#ssr-server-side-rendering-usage)

This guide covers how to use the @ariaskit/astro-i18n library in your Astro pages and components.

## Importing the Library

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
---
```

## SSG (Static Site Generation) Usage

For static sites, use the `ssg` configuration:

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
<p>Current language: {locale}</p>
```

## SSR (Server-Side Rendering) Usage

For server-side rendering, provide translations directly:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

// Load translations based on request
import translations from "@/i18n/en.json"

const { t, locale } = useI18n({ 
  ssr: { 
    translations,
    locale: "en"
  } 
});
---

<h1>{t("title")}</h1>
```
