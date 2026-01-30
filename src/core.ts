import type { AstroGlobal } from "astro";
import { readFileSync } from "fs";
import { join } from "path";
import type { DotNotation } from "@/types";

export function useI18n<T extends Record<string, any>>(
  astro: AstroGlobal,
  baseLang?: string,
) {
  const lang = baseLang ?? astro.currentLocale ?? astro.params?.lang ?? "en";

  const translations = JSON.parse(
    readFileSync(join(process.cwd(), "i18n", `${lang}.json`), "utf-8"),
  ) as Record<string, any>;

  if (!translations) {
    throw new Error(`Translations for language '${lang}' not found. `);
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
        return key as string;
      }

      return interpolate(result, params);
    },
    lang,
  };
}
