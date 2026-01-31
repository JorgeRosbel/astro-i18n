# Routing Strategies

This guide covers different routing strategies for internationalized Astro applications using @ariaskit/astro-i18n.

## Overview

@ariaskit/astro-i18n works with all Astro routing strategies. The library automatically detects the current language from:

1. `Astro.currentLocale` (Astro i18n routing)
2. `Astro.params.lang` (dynamic routes)
3. Explicit locale configuration
4. Fallback to "en"

## Strategy 1: Astro Built-in i18n Routing (Recommended)

Astro 5+ includes built-in internationalization routing support.

### Configuration

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

### File Structure

```
src/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   └── contact.astro
└── layouts/
    └── Layout.astro
```

### Usage

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

### Generated URLs

- `/` - English (default)
- `/es/` - Spanish
- `/fr/` - French
- `/es/about` - Spanish about page
- `/fr/about` - French about page

### Advantages

- ✅ Automatic URL generation
- ✅ SEO-friendly URLs
- ✅ No manual `getStaticPaths` needed
- ✅ Built-in language detection
- ✅ Automatic hreflang generation

## Strategy 2: Dynamic Routes with `[lang]` Parameter

Use dynamic route parameters to specify the language.

### File Structure

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

### Implementation

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

### Generated URLs

- `/en/` - English
- `/es/` - Spanish
- `/fr/` - French
- `/en/about` - English about page
- `/es/about` - Spanish about page

### Advantages

- ✅ Explicit language in URL
- ✅ Full control over routing
- ✅ Works with all Astro versions
- ✅ Easy to understand

### Disadvantages

- ❌ Manual `getStaticPaths` required
- ❌ More boilerplate code

## Strategy 3: Folder-based Routing

Organize pages by language in separate folders.

### File Structure

```
src/
├── pages/
│   ├── index.astro           # Root redirect
│   ├── en/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── es/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   └── fr/
│       ├── index.astro
│       ├── about.astro
│       └── contact.astro
└── layouts/
    └── Layout.astro
```

### Implementation

```astro
---
// src/pages/en/index.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t, locale } = useI18n({ ssg: { astro: Astro } });
---

<html lang={locale}>
<head>
  <title>{t("home.title")}</title>
</head>
<body>
  <h1>{t("home.title")}</h1>
  <p>{t("home.description")}</p>
</body>
</html>
```

```astro
---
// src/pages/es/index.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t, locale } = useI18n({ ssg: { astro: Astro } });
---

<html lang={locale}>
<head>
  <title>{t("home.title")}</title>
</head>
<body>
  <h1>{t("home.title")}</h1>
  <p>{t("home.description")}</p>
</body>
</html>
```

### Root Redirect

```astro
---
// src/pages/index.astro
import Astro from 'astro';

// Redirect to default language
return Astro.redirect('/en/');
---
```

### Advantages

- ✅ Clear folder structure
- ✅ Easy to see all pages per language
- ✅ Simple to understand

### Disadvantages

- ❌ Code duplication
- ❌ Harder to maintain consistency
- ❌ Manual root redirect needed

## Strategy 4: Subdomain Routing

Use different subdomains for each language.

### Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  // Build for multiple domains
  output: 'static'
});
```

### File Structure

Same as Strategy 3 (folder-based), but deployed to different subdomains:

- `en.example.com` - English
- `es.example.com` - Spanish
- `fr.example.com` - French

### Implementation

```astro
---
// Detect language from hostname
const hostname = Astro.url.hostname;
const locale = hostname.split('.')[0] || 'en';

const { t } = useI18n({ 
  ssg: { 
    astro: Astro,
    locale 
  } 
});
---

<html lang={locale}>
<head>
  <title>{t("home.title")}</title>
</head>
<body>
  <h1>{t("home.title")}</h1>
</body>
</html>
```

### Advantages

- ✅ Strong language separation
- ✅ SEO benefits
- ✅ Independent deployments

### Disadvantages

- ❌ Complex deployment setup
- ❌ SSL certificate management
- ❌ Requires multiple domains

## Language Navigation

### Language Switcher Component

Create a reusable language switcher:

```astro
---
// src/components/LanguageSwitcher.astro
import { useI18n } from "@ariaskit/astro-i18n";

const { locale } = useI18n({ ssg: { astro: Astro } });

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
];

// Get current path without language prefix
const currentPath = Astro.url.pathname;
const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '') || '/';
---

<nav class="language-switcher">
  {languages.map(lang => (
    <a 
      href={`/${lang.code}${pathWithoutLang}`}
      class={locale === lang.code ? 'active' : ''}
    >
      {lang.name}
    </a>
  ))}
</nav>

<style>
  .language-switcher {
    display: flex;
    gap: 1rem;
  }
  .active {
    font-weight: bold;
    text-decoration: none;
  }
</style>
```

### Usage in Layout

```astro
---
// src/layouts/Layout.astro
import LanguageSwitcher from "../components/LanguageSwitcher.astro";
import { useI18n } from "@ariaskit/astro-i18n";

const { locale } = useI18n({ ssg: { astro: Astro } });
---

<html lang={locale}>
<head>
  <title>{title}</title>
</head>
<body>
  <header>
    <LanguageSwitcher />
  </header>
  <main>
    <slot />
  </main>
</body>
</html>
```

## SEO Considerations

### Meta Tags

```astro
---
// src/pages/[lang]/index.astro
import { useI18n } from "@ariaskit/astro-i18n";

const { t, locale } = useI18n({ ssg: { astro: Astro } });

const alternateLinks = [
  { hrefLang: 'en', href: '/en/' },
  { hrefLang: 'es', href: '/es/' },
  { hrefLang: 'fr', href: '/fr/' },
  { hrefLang: 'x-default', href: '/en/' }
];
---

<html lang={locale}>
<head>
  <title>{t("meta.title")}</title>
  <meta name="description" content={t("meta.description")} />
  
  {/* Alternate language links */}
  {alternateLinks.map(link => (
    <link rel="alternate" hrefLang={link.hrefLang} href={link.href} />
  ))}
</head>
<body>
  {/* Page content */}
</body>
</html>
```

### Sitemap

Generate a multilingual sitemap:

```astro
---
// src/pages/sitemap.xml.ts
import { getCollection } from 'astro:content';

const pages = await getCollection('pages');
const languages = ['en', 'es', 'fr'];

export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => 
        languages.map(lang => `
          <url>
            <loc>https://example.com/${lang}${page.data.slug}</loc>
            <lastmod>${page.data.lastUpdated}</lastmod>
          </url>
        `).join('')
      ).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
---
```

## Best Practices

### Choose the Right Strategy

1. **New projects**: Use Astro built-in i18n routing
2. **Existing projects**: Dynamic routes with `[lang]` parameter
3. **Simple sites**: Folder-based routing
4. **Enterprise**: Subdomain routing

### Consistency Tips

1. **Use consistent URL patterns** across all languages
2. **Implement proper redirects** for old URLs
3. **Add language switchers** to all pages
4. **Use hreflang tags** for SEO
5. **Test all language routes** thoroughly

### Performance Optimization

1. **Enable caching** for translation files
2. **Use static generation** when possible
3. **Minimize translation file sizes**
4. **Lazy load translations** for large sites

## Migration Guide

### From Folder-based to Astro i18n

1. Move pages from language folders to root `pages/`
2. Configure `astro.config.mjs` with i18n settings
3. Update language detection logic
4. Set up redirects for old URLs

### From Dynamic Routes to Astro i18n

1. Remove `[lang]` folders
2. Add i18n configuration to `astro.config.mjs`
3. Remove `getStaticPaths` from pages
4. Update language switcher component

This guide covers all major routing strategies for internationalized Astro applications. Choose the strategy that best fits your project requirements and technical constraints.
