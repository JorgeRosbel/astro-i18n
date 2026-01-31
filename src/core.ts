import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { DotNotation, I18NParams } from "@/types";

const translationsCache: Record<string, any> = {};

export function useI18n<T extends Record<string, any>>({
  ssg,
  ssr,
}: I18NParams<T>) {
  if (ssg && ssr) {
    throw new Error(
      "[astro-i18n] You cannot provide both 'ssg' and 'ssr' configurations. Choose one based on your rendering strategy.",
    );
  }

  if (!ssg && !ssr) {
    throw new Error(
      "[astro-i18n] You must provide either an 'ssg' or 'ssr' configuration object.",
    );
  }

  const lang =
    ssr?.locale ??
    ssg?.locale ??
    ssg?.astro.currentLocale ??
    ssg?.astro.params?.lang ??
    "en";

  let translations: Record<string, any> | undefined;

  if (ssg) {
    if (!translationsCache[lang]) {
      try {
        const path = join(process.cwd(), "i18n", `${lang}.json`);
        translationsCache[lang] = JSON.parse(readFileSync(path, "utf-8"));
      } catch (e) {
        if (lang !== ssg.locale) {
          return useI18n({ ssg });
        }
        throw new Error(`[astro-i18n] Could not load ${lang}.json`);
      }
    }

    translations = translationsCache[lang];
  }

  if (ssr) {
    translations = ssr.translations;
  }

  if (!translations) {
    throw new Error(
      `[astro-i18n] Could not load ${lang}.json at ${process.cwd()}`,
    );
  }

  function interpolate(text: string, params?: Record<string, any>): string {
    if (!params) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }

  return {
    t: (key: DotNotation<T>, params?: Record<string, any>): string => {
      const keys = (key as string).split(".");
      const result = keys.reduce((obj, k) => obj?.[k], translations);

      if (typeof result !== "string") {
        throw new Error(
          `[astro-i18n] Missing translation key: "${key as string}" for locale: "${lang}".`,
        );
      }

      return interpolate(result, params);
    },
    locale: lang,
  };
}

// Función para obtener todas las llaves de un objeto anidado (dot.notation)
function getAllKeys(obj: any, prefix = ""): string[] {
  return Object.keys(obj).reduce((res: string[], el) => {
    const name = prefix ? `${prefix}.${el}` : el;
    if (
      typeof obj[el] === "object" &&
      obj[el] !== null &&
      !Array.isArray(obj[el])
    ) {
      return [...res, ...getAllKeys(obj[el], name)];
    }
    return [...res, name];
  }, []);
}

export function validateTranslations(baseLocale = "en") {
  const i18nDir = join(process.cwd(), "i18n");
  const files = readdirSync(i18nDir).filter((f) => f.endsWith(".json"));

  const baseContent = JSON.parse(
    readFileSync(join(i18nDir, `${baseLocale}.json`), "utf-8"),
  );
  const baseKeys = getAllKeys(baseContent);

  let hasErrors = false;

  files.forEach((file) => {
    if (file === `${baseLocale}.json`) return;

    const currentLocale = file.replace(".json", "");
    const currentContent = JSON.parse(
      readFileSync(join(i18nDir, file), "utf-8"),
    );
    const currentKeys = getAllKeys(currentContent);

    const missingKeys = baseKeys.filter((k) => !currentKeys.includes(k));
    const extraKeys = currentKeys.filter((k) => !baseKeys.includes(k));

    if (missingKeys.length > 0 || extraKeys.length > 0) {
      hasErrors = true;
      console.log(`\nLocale: [${currentLocale}]`);
      missingKeys.forEach((k) => console.error(`  ❌ Missing key: ${k}`));
      extraKeys.forEach((k) =>
        console.warn(`  ⚠️  Extra key (not in base): ${k}`),
      );
    }
  });

  if (!hasErrors) {
    console.log("✅ All translation files are in sync!");
  } else {
    process.exit(1); // Hace que el build falle si hay errores
  }
}
