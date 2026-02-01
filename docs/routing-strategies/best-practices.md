# Best Practices

## Table of Contents

- [Choose the Right Strategy](#choose-the-right-strategy)
- [Consistency Tips](#consistency-tips)
- [Performance Optimization](#performance-optimization)
- [Migration Guide](#migration-guide)

## Choose the Right Strategy

1. **New projects**: Use Astro built-in i18n routing
2. **Existing projects**: Dynamic routes with `[lang]` parameter
3. **Simple sites**: Folder-based routing
4. **Enterprise**: Subdomain routing

## Consistency Tips

1. **Use consistent URL patterns** across all languages
2. **Implement proper redirects** for old URLs
3. **Add language switchers** to all pages
4. **Use hreflang tags** for SEO
5. **Test all language routes** thoroughly

## Performance Optimization

1. **Enable caching** for translation files
2. **Use static generation** when possible
3. **Minimize translation file sizes**
4. **Lazy load translations** for large sites

## Migration Guide

### From Folder-based to Astro i18n

1. Move pages from language folders to root `pages/`
2. Configure `astro.config.mjs` with i18n settings
3. Update language detection logic
4. Set up redirects for old URLs

### From Dynamic Routes to Astro i18n

1. Remove `[lang]` folders
2. Add i18n configuration to `astro.config.mjs`
3. Remove `getStaticPaths` from pages
4. Update language switcher component

This guide covers all major routing strategies for internationalized Astro applications. Choose the strategy that best fits your project requirements and technical constraints.
