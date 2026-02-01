# API Reference

Complete API documentation for @ariaskit/astro-i18n.

## Main Function

### `useI18n<T>(params: I18NParams<T>)`

The main function for setting up internationalization in your Astro pages.

#### Parameters

```typescript
interface I18NParams<T> {
  ssg?: SSGParams;    // For static site generation
  ssr?: SSRParams<T>; // For server-side rendering
}
```

**Note:** You must provide either `ssg` or `ssr`, but not both.

#### Returns

```typescript
{
  t: (key: DotNotation<T>, params?: Record<string, any>) => string;
  locale: string;
}
```

- `t`: Translation function
- `locale`: Current detected language code

## SSG Configuration

### `SSGParams`

Configuration for static site generation.

```typescript
interface SSGParams {
  astro: AstroGlobal<any, any, any>;
  locale?: string;
}
```

#### Properties

- **astro** (required): The Astro global object from your page
- **locale** (optional): Override the detected locale

#### Example

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
```

#### With Custom Locale

```astro
---
const { t, locale } = useI18n({ 
  ssg: { 
    astro: Astro,
    locale: "es" 
  } 
});
---
```

## SSR Configuration

### `SSRParams<T>`

Configuration for server-side rendering.

```typescript
interface SSRParams<T> {
  translations: T;
  locale: string;
}
```

#### Properties

- **translations** (required): Translation object for the current locale
- **locale** (required): Current locale string

#### Example

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

// Load translations based on request
const translations = await loadTranslations(Astro.request);

const { t, locale } = useI18n({ 
  ssr: { 
    translations,
    locale: Astro.currentLocale 
  } 
});
---
```

## Translation Function

### `t(key, params?)`

The translation function returned by `useI18n`.

#### Parameters

- **key** (`DotNotation<T>`): Translation key using dot notation
- **params** (`Record<string, any>`, optional): Variables for interpolation

#### Returns

- `string`: The translated text

#### Examples

**Simple translation:**
```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
---

<h1>{t("title")}</h1>
```

**Nested key:**
```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
---

<p>{t("navigation.home")}</p>
```

**With interpolation:**
```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
---

<p>{t("welcome", { name: "Alice" })}</p>
```

## Type System

### `DotNotation<T, Prefix, Depth>`

Advanced TypeScript type that provides autocompletion for nested translation keys.

#### Type Parameters

- **T**: The translation object type
- **Prefix** (optional): Internal prefix for recursive calls
- **Depth** (optional): Maximum nesting depth (default: 5)

#### Example

```typescript
// Translation type
type Translations = {
  title: string;
  navigation: {
    home: string;
    about: string;
  };
  user: {
    profile: {
      name: string;
      email: string;
    };
  };
};

// DotNotation<Translations> resolves to:
// "title" | "navigation.home" | "navigation.about" | "user.profile.name" | "user.profile.email"
```

## Language Detection

The library detects the current language using this priority:

1. **Explicit locale** in `ssg.locale` or `ssr.locale`
2. **Astro.currentLocale** (from Astro i18n routing)
3. **Astro.params.lang** (from dynamic routes like `[lang]`)
4. **Fallback to "en"**

### Detection Examples

```astro
---
// 1. Explicit locale (highest priority)
const { t, locale } = useI18n({ 
  ssg: { 
    astro: Astro,
    locale: "fr" 
  } 
});
// locale = "fr"

// 2. Astro i18n routing
// astro.config.mjs has i18n configuration
const { t, locale } = useI18n({ ssg: { astro: Astro } });
// locale = Astro.currentLocale

// 3. Dynamic routes
// URL: /es/about
const { t, locale } = useI18n({ ssg: { astro: Astro } });
// locale = "es" (from Astro.params.lang)

// 4. Fallback
const { t, locale } = useI18n({ ssg: { astro: Astro } });
// locale = "en"
---
```

## File Structure

### Translation Files Location

The library looks for translation files in the project root:

```
your-project/
├── i18n/
│   ├── en.json
│   ├── es.json
│   ├── fr.json
│   └── de.json
├── src/
├── astro.config.mjs
└── package.json
```

### File Naming Convention

Files must be named with the locale code and `.json` extension:

- `en.json` - English
- `es.json` - Spanish
- `fr.json` - French
- `de.json` - German
- `ja.json` - Japanese

### Translation File Format

```json
{
  "simple_key": "Translation",
  "nested": {
    "key": "Nested translation",
    "deep": {
      "key": "Deeply nested translation"
    }
  },
  "interpolation": "Hello {{name}}, you have {{count}} items"
}
```

## Error Handling

### Error Types

The library throws specific errors for different situations:

#### Configuration Errors

```typescript
// Both ssg and ssr provided
useI18n({ ssg: { astro: Astro }, ssr: { translations: {}, locale: "en" } });
// Throws: "[astro-i18n] You cannot provide both 'ssg' and 'ssr' configurations..."

// Neither ssg nor ssr provided
useI18n({});
// Throws: "[astro-i18n] You must provide either an 'ssg' or 'ssr' configuration object."
```

#### File Not Found

```typescript
// Translation file doesn't exist
// Throws: "[astro-i18n] Could not load fr.json"
```

#### Missing Translation Key

```typescript
const { t } = useI18n({ ssg: { astro: Astro } });
t("nonexistent.key");
// Throws: '[astro-i18n] Missing translation key: "nonexistent.key" for locale: "en".'
```

### Error Handling Pattern

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

let t, locale;

try {
  ({ t, locale } = useI18n({ ssg: { astro: Astro } }));
} catch (error) {
  console.error("I18n setup failed:", error.message);
  // Fallback behavior
  t = (key: string) => key;
  locale = "en";
}
---

<h1>{t("title")}</h1>
```

## Performance

### Caching

The library caches loaded translation files in memory:

```typescript
// Translation files are cached after first load
// Subsequent calls use cached data
const translationsCache: Record<string, any> = {};
```

### Memory Usage

- Translation files are loaded once per language
- Cache persists for the duration of the build process
- Minimal memory overhead for typical translation file sizes

### Build Performance

- File system access only occurs during build time (SSG)
- No runtime file system operations
- Fast key lookup using object property access

## TypeScript Integration

### Full Type Safety

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t } = useI18n({ ssg: { astro: Astro } });

// ✅ TypeScript autocompletion and type checking
const title = t("title");
const navHome = t("navigation.home");

// ❌ TypeScript error for invalid keys
const invalid = t("invalid.key");
---
```

### Generic Types

```typescript
// Define your translation type
interface Translations {
  title: string;
  navigation: {
    home: string;
    about: string;
  };
}

// Use with useI18n
const { t } = useI18n<Translations>({ ssg: { astro: Astro } });
```

This complete API reference covers all aspects of the @ariaskit/astro-i18n library. For practical examples and usage patterns, see the [Library Usage](./library-usage/) guide.
