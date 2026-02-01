# Strategy 3: Folder-based Routing

## Table of Contents

- [File Structure](#file-structure)
- [Implementation](#implementation)
- [Root Redirect](#root-redirect)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)

Organize pages by language in separate folders.

## File Structure

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

## Implementation

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

## Root Redirect

```astro
---
// src/pages/index.astro
import Astro from 'astro';

// Redirect to default language
return Astro.redirect('/en/');
---
```

## Advantages

- ✅ Clear folder structure
- ✅ Easy to see all pages per language
- ✅ Simple to understand

## Disadvantages

- ❌ Code duplication
- ❌ Harder to maintain consistency
- ❌ Manual root redirect needed
