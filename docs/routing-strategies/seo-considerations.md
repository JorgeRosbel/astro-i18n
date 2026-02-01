# SEO Considerations

## Table of Contents

- [Meta Tags](#meta-tags)
- [Sitemap](#sitemap)

## Meta Tags

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

## Sitemap

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
