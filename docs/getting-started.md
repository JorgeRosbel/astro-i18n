# Getting Started

This guide will help you install and set up @ariaskit/astro-i18n in your Astro project.

## Prerequisites

- Astro project (version 5.0.0 or higher)
- Node.js 18 or higher
- Basic knowledge of Astro

## Installation

Install the package using your preferred package manager:

```bash
# npm
npm install @ariaskit/astro-i18n

# pnpm
pnpm add @ariaskit/astro-i18n

# yarn
yarn add @ariaskit/astro-i18n
```

## Project Setup

### 1. Create Translation Files

Create a new directory called `i18n` in the root of your project (not inside `src/`):

```
your-project/
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── src/
├── astro.config.mjs
└── package.json
```

### 2. Add Translation Content

Add your translations to each language file:

**i18n/en.json**
```json
{
  "title": "Welcome",
  "description": "This is a sample website",
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "welcome_message": "Hello, {{name}}!",
  "items_count": "You have {{count}} items"
}
```

**i18n/es.json**
```json
{
  "title": "Bienvenido",
  "description": "Este es un sitio web de ejemplo",
  "navigation": {
    "home": "Inicio",
    "about": "Acerca de",
    "contact": "Contacto"
  },
  "welcome_message": "¡Hola, {{name}}!",
  "items_count": "Tienes {{count}} elementos"
}
```

**i18n/fr.json**
```json
{
  "title": "Bienvenue",
  "description": "Ceci est un site web d'exemple",
  "navigation": {
    "home": "Accueil",
    "about": "À propos",
    "contact": "Contact"
  },
  "welcome_message": "Bonjour, {{name}}!",
  "items_count": "Vous avez {{count}} éléments"
}
```

### 3. Configure TypeScript (Optional but Recommended)

If you're using TypeScript, enable JSON imports and path mapping in your `tsconfig.json`:

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

### 4. Verify Installation

Make sure your project structure looks like this:

```
your-project/
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── src/
│   └── pages/
├── astro.config.mjs
├── package.json
└── tsconfig.json (if using TypeScript)
```

## Next Steps

Now that you have the basic setup:

1. [Learn how to use the library](./library-usage/)
2. [Explore routing strategies](./routing-strategies/)
3. [Check out the CLI tool](./cli-usage.md)
4. [Read the API reference](./api-reference.md)

## Troubleshooting

### Common Issues

**Translation files not found:**
- Ensure your `i18n/` directory is in the project root, not inside `src/`
- Check that file names match the language codes (e.g., `en.json`, `es.json`)

**TypeScript errors:**
- Make sure `resolveJsonModule` is enabled in `tsconfig.json`
- Verify your path mapping configuration

**Build errors:**
- Ensure you're using Astro 5.0.0 or higher
- Check that all JSON files are valid JSON format

### Getting Help

If you encounter issues:

2. Review the [API documentation](./api-reference.md)
3. Open an issue on [GitHub](https://github.com/JorgeRosbel/astro-i18n/issues)
