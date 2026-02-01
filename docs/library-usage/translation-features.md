# Translation Features

## Table of Contents

- [Simple Translations](#simple-translations)
- [Nested Keys (Dot Notation)](#nested-keys-dot-notation)
- [Variable Interpolation](#variable-interpolation)

## Simple Translations

Access translation keys directly:

```astro
---
const { t } = useI18n({ ssg: { astro: Astro } });
---

<h1>{t("title")}</h1>
<p>{t("description")}</p>
```

## Nested Keys (Dot Notation)

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

## Variable Interpolation

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
