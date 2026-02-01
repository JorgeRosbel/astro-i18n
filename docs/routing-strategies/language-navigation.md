# Language Navigation

## Table of Contents

- [Language Switcher Component](#language-switcher-component)
- [Usage in Layout](#usage-in-layout)

## Language Switcher Component

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

## Usage in Layout

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
