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
- 🛠️ **Visual Debugger**: Inspect translation keys and params in development.

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @ariaskit/astro-i18n

# Using npm
npm install @ariaskit/astro-i18n

```

## Quick Start

1. Create translation files in `i18n/` (e.g., `en.json`, `es.json`).
2. Use in your Astro pages:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";

const { t } = useI18n({ ssg: { astro: Astro } });
---

<h1>{t("common.title")}</h1>
<p>{t("common.welcome", { name: "User" })}</p>

```

## 🛠️ Debug Mode (Development Only)

This library includes a powerful **Visual Inspector** to help you identify translation keys and required parameters directly in the browser.

> [!NOTE]
> **Zero Production Overhead**: The debug tool only renders during development (`NODE_ENV === 'development'`). In production, it renders pure HTML without any extra tags or tooltips.

### Usage

Import `I18NDebug` and wrap your translated elements:

```astro
---
import { useI18n } from "@ariaskit/astro-i18n";
import I18NDebug from "@ariaskit/astro-i18n/I18NDebug.astro";

const { t } = useI18n({ ssg: { astro: Astro } });
---

<I18NDebug key="user.profile.title" params={["name", "role"]}>
  <h2>{t("user.profile.title", { name: "John", role: "Admin" })}</h2>
</I18NDebug>

<p>
  Please visit our 
  <I18NDebug key="nav.dashboard">
    <a href="/dashboard">{t("nav.dashboard")}</a>
  </I18NDebug>
  to manage your account.
</p>

```

### Inspector Features

* 🔍 **Key Identification**: Hover over any highlighted element to see its JSON key.
* 🏷️ **Params Documentation**: View exactly which variables a translation expects.
* 🎨 **Smart Highlight**: Elements are marked with a subtle yellow background on hover.
* 🧵 **Layout Friendly**: Designed as an `inline` element by default to preserve your UI flow.