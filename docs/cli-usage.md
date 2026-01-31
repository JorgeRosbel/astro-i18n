# CLI Usage

The @ariaskit/astro-i18n CLI tool helps you validate and maintain consistency across your translation files.

## Installation

The CLI is automatically installed when you install the package:

```bash
npm install @ariaskit/astro-i18n
```

## Command Overview

The CLI provides the `astro-i18n-check` command that validates your translation files.

### Basic Usage

```bash
astro-i18n-check
```

This command:
- Scans all JSON files in your `i18n/` directory
- Uses `en.json` as the base locale by default
- Checks for missing and extra keys in other locale files
- Exits with error code 1 if inconsistencies are found

## Command Options

### Specify Base Locale

Use a different base locale with the `--base` flag:

```bash
# Use Spanish as the base locale
astro-i18n-check --base es

# Use French as the base locale
astro-i18n-check --base fr
```

### Help

Get help and see all available options:

```bash
astro-i18n-check --help
```

## How It Works

### Validation Process

The CLI performs these checks:

1. **Reads all translation files** from the `i18n/` directory
2. **Extracts all keys** from the base locale file (including nested keys)
3. **Compares each locale file** against the base locale
4. **Reports inconsistencies**:
   - Missing keys (present in base, absent in target)
   - Extra keys (present in target, absent in base)

### Key Extraction

The CLI recursively extracts all keys from nested objects:

```json
{
  "title": "Welcome",
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "user": {
    "profile": {
      "name": "Name",
      "email": "Email"
    }
  }
}
```

Extracted keys:
- `title`
- `navigation.home`
- `navigation.about`
- `user.profile.name`
- `user.profile.email`

## Output Examples

### Successful Validation

When all translation files are in sync:

```bash
$ astro-i18n-check
✅ All translation files are in sync!
```

### Validation with Errors

When inconsistencies are found:

```bash
$ astro-i18n-check

Locale: [es]
  ❌ Missing key: navigation.contact
  ⚠️  Extra key (not in base): navigation.inicio

Locale: [fr]
  ❌ Missing key: user.profile.email
  ❌ Missing key: navigation.about
```

### Using Custom Base Locale

```bash
$ astro-i18n-check --base es

Locale: [en]
  ❌ Missing key: navegacion.inicio
  ⚠️  Extra key (not in base): navigation.home

Locale: [fr]
  ❌ Missing key: navegacion.inicio
  ❌ Missing key: usuario.perfil.nombre
```

## Integration with Development Workflow

### Package.json Scripts

Add the CLI to your npm scripts:

```json
{
  "scripts": {
    "i18n:check": "astro-i18n-check",
    "i18n:check:es": "astro-i18n-check --base es",
    "build": "npm run i18n:check && astro build",
    "precommit": "npm run i18n:check"
  }
}
```

### Git Hooks

Use with Husky for pre-commit validation:

```bash
# Install Husky
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run i18n:check"
```

### CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate translations
        run: npm run i18n:check
      
      - name: Run tests
        run: npm test
```

## Best Practices

### Regular Validation

1. **Run before commits**: Ensure translations are always in sync
2. **CI/CD integration**: Catch issues early in development
3. **Team coordination**: Use consistent base locale across team

### File Organization

Keep your translation files organized:

```
i18n/
├── en.json          # Base locale
├── es.json
├── fr.json
├── de.json
└── ja.json
```

### Key Naming Conventions

Use consistent key naming:

```json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "forms": {
    "submit": "Submit",
    "cancel": "Cancel",
    "required": "This field is required"
  },
  "errors": {
    "not_found": "Page not found",
    "server_error": "Server error"
  }
}
```

## Troubleshooting

### Common Issues

**Command not found:**
```bash
# Make sure the package is installed
npm install @ariaskit/astro-i18n

# Or use npx
npx astro-i18n-check
```

**File not found errors:**
- Ensure `i18n/` directory exists in project root
- Check that JSON files are properly formatted
- Verify file names match locale codes (e.g., `en.json`, `es.json`)

**Permission denied:**
- Check file permissions on `i18n/` directory
- Ensure the CLI has read access to translation files

### Debug Mode

For debugging, you can run the CLI with verbose output:

```bash
# The CLI will show detailed information about the validation process
astro-i18n-check
```

## Advanced Usage

### Multiple Base Locales

For teams working with different primary languages:

```json
{
  "scripts": {
    "i18n:check:en": "astro-i18n-check --base en",
    "i18n:check:es": "astro-i18n-check --base es",
    "i18n:check:all": "npm run i18n:check:en && npm run i18n:check:es"
  }
}
```

### Custom Validation Logic

For complex validation needs, you can extend the CLI functionality:

```bash
# Run validation with different base locales
for locale in en es fr; do
  echo "Checking with $locale as base..."
  astro-i18n-check --base $locale
done
```

This CLI tool helps maintain translation consistency across your internationalized Astro project. Use it regularly to ensure all language files stay in sync.
