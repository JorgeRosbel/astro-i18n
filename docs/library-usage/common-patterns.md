# Common Patterns

## Table of Contents

- [Navigation Component](#navigation-component)
- [Page Templates](#page-templates)

## Navigation Component

Create a reusable navigation component:

```astro
---
// src/components/Navigation.astro
import { useI18n } from "@ariaskit/astro-i18n";
import { BaseLocaleSchema } from "...."

const { t } = useI18n<BaseLocaleSchema>({ ssg: { astro: Astro } });
---

<nav>
  <a href="/">{t("navigation.home")}</a>
  <a href="/about">{t("navigation.about")}</a>
  <a href="/contact">{t("navigation.contact")}</a>
</nav>
```

## Page Templates

Create a base page template:

```astro
---
// src/layouts/BasePage.astro
import { useI18n } from "@ariaskit/astro-i18n";
import { BaseLocaleSchema } from "...."

const { t, locale } = useI18n<BaseLocaleSchema>({ ssg: { astro: Astro } });

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
