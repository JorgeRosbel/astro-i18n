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

## Documentation

- [Getting Started](docs/getting-started.md) - Installation and basic setup
- [Library Usage](docs/library-usage.md) - How to use the library
- [CLI Usage](docs/cli-usage.md) - Command line tool documentation
- [API Reference](docs/api-reference.md) - Complete API reference
- [Routing Strategies](docs/routing-strategies.md) - Different routing approaches

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

## License

MIT
