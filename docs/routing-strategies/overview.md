# Overview

## Table of Contents

- [Language Detection](#language-detection)

## Language Detection

@ariaskit/astro-i18n works with all Astro routing strategies. The library automatically detects the current language from:

1. `Astro.currentLocale` (Astro i18n routing)
2. `Astro.params.lang` (dynamic routes)
3. Explicit locale configuration
4. Fallback to "en"
