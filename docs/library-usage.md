# Library Usage

This guide covers how to use the @ariaskit/astro-i18n library in your Astro pages and components.

## Basic Usage

### Importing the Library

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
---
```

### SSG (Static Site Generation) Usage

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

### SSR (Server-Side Rendering) Usage

For server-side rendering, provide translations directly:

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

<h1>{t("title")}</h1>
```

## Translation Features

### Simple Translations

Access translation keys directly:

```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
---

<h1>{t("title")}</h1>
<p>{t("description")}</p>
```

### Nested Keys (Dot Notation)

Access nested translation keys using dot notation:

```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
---

<nav>
  <a href="/">{t("navigation.home")}</a>
  <a href="/about">{t("navigation.about")}</a>
  <a href="/contact">{t("navigation.contact")}</a>
</nav>
```

### Variable Interpolation

Use variables in your translations with `{{variableName}}` syntax:

**Translation file (i18n/en.json):**
```json
{
  "welcome": "Welcome, {{name}}!",
  "greeting": "Hello {{name}}, you have {{count}} messages",
  "user_profile": "Profile of {{firstName}} {{lastName}}"
}
```

**Usage in Astro:**
```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
const userName = "Alice";
const messageCount = 5;
---

<h1>{t("welcome", { name: userName })}</h1>
<p>{t("greeting", { name: userName, count: messageCount })}</p>
<p>{t("user_profile", { firstName: "John", lastName: "Doe" })}</p>
```

**Output:**
```html
<h1>Welcome, Alice!</h1>
<p>Hello Alice, you have 5 messages</p>
<p>Profile of John Doe</p>
```

## TypeScript Support

### With TypeScript Autocompletion

For the best experience, import your translation file and use it as a type:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t, locale } = useI18n({ 
  ssg: { 
    astro: Astro 
  } 
});

// Now you get autocompletion for translation keys!
const title = t("title"); // ✅ Autocomplete works
const invalid = t("invalid.key"); // ❌ TypeScript error
---

<h1>{t("title")}</h1>
<p>{t("navigation.home")}</p>
```

### Without TypeScript

If you're not using TypeScript or prefer dynamic usage:

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
<p>{t("navigation.home")}</p>
```

## Language Detection

The library automatically detects the current language using this priority:

1. **Explicit locale** in configuration
2. **Astro.currentLocale** (from Astro i18n routing)
3. **Astro.params.lang** (from dynamic routes)
4. **Fallback to "en"**

### Forcing a Specific Language

You can override the automatic detection:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

// Force Spanish regardless of route
const { t, locale } = useI18n({ 
  ssg: { 
    astro: Astro,
    locale: "es" 
  } 
});
---

<h1>{t("title")}</h1>
<p>Forced language: {locale}</p>
```

## Common Patterns

### Navigation Component

Create a reusable navigation component:

```astro
---
// src/components/Navigation.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t } = useI18n({ ssg: { astro: Astro } });
---

<nav>
  <a href="/">{t("navigation.home")}</a>
  <a href="/about">{t("navigation.about")}</a>
  <a href="/contact">{t("navigation.contact")}</a>
</nav>
```

### Page Templates

Create a base page template:

```astro
---
// src/layouts/BasePage.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";

const { t, locale } = useI18n({ ssg: { astro: Astro } });

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<html lang={locale}>
<head>
  <title>{t(title)}</title>
</head>
<body>
  <slot />
</body>
</html>
```

### Error Handling

The library throws errors for common issues:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

try {
  const { t, locale } = useI18n({ ssg: { astro: Astro } });
  
  // This will throw if the key doesn't exist
  const translation = t("nonexistent.key");
  
} catch (error) {
  console.error("Translation error:", error.message);
  // Handle the error gracefully
}
---

<h1>Fallback title</h1>
```

## Best Practices

1. **Use TypeScript** for better autocompletion and error catching
2. **Organize translations** with logical nesting
3. **Keep keys consistent** across all language files
4. **Use descriptive keys** that reflect the content
5. **Test all languages** to ensure translations work correctly
6. **Use the CLI tool** to validate translation files

## Examples

### Complete Page Example

```astro
---
// src/pages/index.astro
import { useI18n } from "@ariaskit/astro-i18n";
import en from "i18n/en.json";
import Layout from "../layouts/Layout.astro";

const { t, locale } = useI18n({ ssg: { astro: Astro } });
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

This covers the main usage patterns for the @ariaskit/astro-i18n library. For more advanced features, see the [Advanced Usage](./advanced-usage.md) guide.
