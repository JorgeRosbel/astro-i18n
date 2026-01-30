# @ariaskit/astro-i18n

Simple internationalization (i18n) library for Astro with TypeScript support.

## Features

- ✅ TypeScript autocomplete for translation keys using `DotNotation` type
- ✅ Nested translations with dot notation (`data.users`)
- ✅ Variable interpolation with `{{variableName}}` syntax
- ✅ Works with all Astro routing strategies
- ✅ Zero configuration needed
- ✅ Lightweight and fast
- ✅ Strong TypeScript support with path mapping

## Installation

```bash
npm install @ariaskit/astro-i18n
# or
pnpm add @ariaskit/astro-i18n
# or
yarn add @ariaskit/astro-i18n
```

## Setup

1. Create your translation files in `i18n/`:

```
i18n/
  en.json
  es.json
```

**Example `en.json`:**
```json
{
  "title": "Welcome",
  "welcome_message": "Hello World",
  "data": {
    "users": "Users",
    "settings": "Settings"
  }
}
```

**Example `es.json`:**
```json
{
  "title": "Bienvenido",
  "welcome_message": "Hola Mundo",
  "data": {
    "users": "Usuarios",
    "settings": "Configuración"
  }
}
```

2. Enable JSON imports and path mapping in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

3. Ensure your translation files are in the root `i18n/` directory (not `src/i18n/`):

## Usage

### With TypeScript (Recommended)

TypeScript support is **optional** but provides autocompletion for translation keys.

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json"; // Adjust path based on your structure

const { t, lang } = useI18n<typeof en>(Astro);
---

<h1>{t("title")}</h1>
<p>{t("welcome_message")}</p>
<p>{t("data.users")}</p>
```

### Without TypeScript

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

const { t, lang } = useI18n(Astro);
---

<h1>{t("title")}</h1>
<p>{t("welcome_message")}</p>
```

## Variables/Interpolation

You can use variables in your translations using the `{{variableName}}` syntax.

**Example JSON:**
```json
{
  "welcome": "Welcome, {{name}}!",
  "greeting": "Hello {{name}}, you have {{count}} messages",
  "data": {
    "users": "Users {{name}}"
  }
}
```

**Usage:**
```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t } = useI18n<typeof en>(Astro);
---

<h1>{t("welcome", { name: "Victor" })}</h1>
<h2>{t("data.users", { name: "Victor" })}</h2>
<p>{t("greeting", { name: "Victor", count: 5 })}</p>
```

**Output:**
```html
<h1>Welcome, Victor!</h1>
<h2>Users Victor</h2>
<p>Hello Victor, you have 5 messages</p>
```

## Routing Strategies

### Option 1: Dynamic Routes with `[lang]` param

```
src/
  pages/
    [lang]/
      index.astro
      about.astro
```

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json"; // Adjust path based on your structure
import type { GetStaticPaths } from "astro";

export const getStaticPaths = (() => {
  return [
    { params: { lang: "en" } },
    { params: { lang: "es" } }
  ];
}) satisfies GetStaticPaths;

const { t, lang } = useI18n<typeof en>(Astro);
---

<html lang={lang}>
  <body>
    <h1>{t("title")}</h1>
    <p>{t("welcome_message")}</p>
  </body>
</html>
```

### Option 2: Folder Structure (`/en`, `/es`)

```
src/
  pages/
    en/
      index.astro
      about.astro
    es/
      index.astro
      about.astro
```

Works the same way. The library detects the locale from `Astro.currentLocale` or `Astro.params.lang`.

### Option 3: Astro i18n Routing (Recommended)

```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  }
});
```

```astro
---
// No need for getStaticPaths
const { t, lang } = useI18n<typeof en>(Astro);
---
```

## API

### `useI18n<T>(astro: AstroGlobal, baseLang?: string)`

Returns:
- `t(key: DotNotation<T>, params?: Record<string, any>)`: Translation function with dot notation support and variable interpolation
- `lang`: Current detected language

**Language detection priority:**
1. `baseLang` parameter (if provided)
2. `Astro.currentLocale` (from Astro i18n config)
3. `Astro.params.lang` (from dynamic routes)
4. `'en'` (fallback)

**File Structure:**
The library looks for translation files in the root `i18n/` directory:
```
i18n/
  en.json
  es.json
  // ... other language files
```

## Advanced Usage

### Custom Base Language

You can override the language detection by providing a `baseLang` parameter:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

// Force Spanish regardless of route/locale
const { t, lang } = useI18n<typeof en>(Astro, "es");
---
```

### TypeScript Configuration

The library uses advanced TypeScript features including:
- **Path mapping**: Configure `@/*` paths in your `tsconfig.json`
- **DotNotation type**: Provides autocompletion for nested translation keys
- **Generic types**: Full type safety for your translation structure

Make sure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Error Handling

The library will throw an error if:
- Translation file for the detected language is not found
- The JSON file is malformed or cannot be parsed

## Development

This project is built with:
- **TypeScript** for type safety
- **tsup** for bundling
- **Vitest** for testing
- **Husky** for git hooks
- **Prettier** for code formatting

## License

MIT
