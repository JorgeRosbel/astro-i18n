# Strategy 4: Subdomain Routing

## Table of Contents

- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Implementation](#implementation)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

Use different subdomains for each language.

## Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  // Build for multiple domains
  output: 'static'
});
```

## File Structure

Same as Strategy 3 (folder-based), but deployed to different subdomains:

- `en.example.com` - English
- `es.example.com` - Spanish
- `fr.example.com` - French

## Implementation

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

## Advantages

- ✅ Strong language separation
- ✅ SEO benefits
- ✅ Independent deployments

## Disadvantages

- ❌ Complex deployment setup
- ❌ SSL certificate management
- ❌ Requires multiple domains
