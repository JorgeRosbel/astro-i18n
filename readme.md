# @ariaskit/astro-i18n

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@ariaskit/astro-i18n?style=flat-square&color=BC443E)](https://www.npmjs.com/package/@ariaskit/astro-i18n)
[![NPM Downloads](https://img.shields.io/npm/dm/@ariaskit/astro-i18n?style=flat-square&color=5D9948)](https://www.npmjs.com/package/@ariaskit/astro-i18n)
[![CI Status](https://img.shields.io/github/actions/workflow/status/JorgeRosbel/astro-i18n/publish.yml?style=flat-square&label=Publish)](https://github.com/JorgeRosbel/astro-i18n/actions)
[![CI Status](https://img.shields.io/github/actions/workflow/status/JorgeRosbel/astro-i18n/lint-format.yml?style=flat-square&label=Format-Lint)](https://github.com/JorgeRosbel/astro-i18n/actions)
[![CI Status](https://img.shields.io/github/actions/workflow/status/JorgeRosbel/astro-i18n/tests.yml?style=flat-square&label=Tests)](https://github.com/JorgeRosbel/astro-i18n/actions)
[![License](https://img.shields.io/github/license/JorgeRosbel/astro-i18n?style=flat-square)](LICENSE)

**Simple, type-safe internationalization (i18n) for Astro.** *Built for speed, developer experience, and TypeScript enthusiasts.*

[Explore the Docs](docs/getting-started.md) · [Report Bug](https://github.com/JorgeRosbel/astro-i18n/issues) · [API Reference](docs/api-reference.md)

</div>

---

> *This is a community project and is not officially affiliated with or endorsed by the Astro team.*

## ✨ Features

- 💎 **Type-Safe Autocomplete**: Full TypeScript support for nested translation keys.
- 🚀 **Zero-Config**: Works out of the box with any Astro routing strategy.
- 📦 **Ultra-Lightweight**: Minimal overhead and tiny bundle size.
- 🔗 **Dot Notation**: Access nested translations easily (e.g., `user.profile.name`).
- 🧩 **Interpolation**: Dynamic variables with `{{param}}` syntax.
- 🛡️ **Reliable CI**: Tested against production environments with 100% automated checks.

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @ariaskit/astro-i18n

# Using npm
npm install @ariaskit/astro-i18n

# Using yarn
yarn add @ariaskit/astro-i18n
```

## Quick Start

1. Create translation files in `i18n/`:

```
i18n/
  en.json
  es.json
```

2. Use in your Astro pages:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

const { t, locale } = useI18n({ ssg: { astro: Astro } });
---

<h1>{t("title")}</h1>
<p>{t("welcome_message", { name: "World" })}</p>
```