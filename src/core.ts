import { readFileSync } from 'fs';
import { join } from 'path';
import type { DotNotation, I18NParams } from '@/types';

const translationsCache: Record<string, any> = {};

export function useI18n<T extends Record<string, any>>({ ssg, ssr }: I18NParams<T>) {
  if (ssg && ssr) {
    throw new Error(
      "[astro-i18n] You cannot provide both 'ssg' and 'ssr' configurations. Choose one based on your rendering strategy."
    );
  }

  if (!ssg && !ssr) {
    throw new Error("[astro-i18n] You must provide either an 'ssg' or 'ssr' configuration object.");
  }

  const isDev = process.env.NODE_ENV === 'development';

  const lang =
    ssr?.locale ?? ssg?.locale ?? ssg?.astro.currentLocale ?? ssg?.astro.params?.lang ?? 'en';

  let translations: Record<string, any> | undefined;

  if (ssg) {
    if (isDev || !translationsCache[lang]) {
      try {
        const path = join(process.cwd(), 'i18n', `${lang}.json`);
        translationsCache[lang] = JSON.parse(readFileSync(path, 'utf-8'));
      } catch {
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
    throw new Error(`[astro-i18n] Could not load ${lang}.json at ${process.cwd()}`);
  }

  function interpolate(text: string, params?: Record<string, any>): string {
    if (!params) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }

  return {
    t: (key: DotNotation<T>, params?: Record<string, any>): string => {
      const keys = (key as string).split('.');
      const result = keys.reduce((obj, k) => obj?.[k], translations);

      if (typeof result !== 'string') {
        throw new Error(
          `[astro-i18n] Missing translation key: "${key as string}" for locale: "${lang}".`
        );
      }

      return interpolate(result, params);
    },
    locale: lang,
  };
}
