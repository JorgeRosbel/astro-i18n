import type { AstroGlobal } from 'astro';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { DotNotation } from '@/types';


export function useI18n<T extends Record<string, any>>(
    astro: AstroGlobal,
) {
    const lang = astro.currentLocale ?? astro.params?.lang ?? 'en';
    
    const translations = JSON.parse(
        readFileSync(join(process.cwd(), 'src', 'i18n', `${lang}.json`), 'utf-8')
    ) as Record<string, any>;


    if(!translations) {
        throw new Error(`Translations for language '${lang}' not found.`);
    }

    return {
        t: (key: DotNotation<T>) => {
            const keys = (key as string).split('.');

            const result = keys.reduce((obj, k) => obj?.[k], translations);
            return result ?? key;
        },
        lang,
        changeLocale: (newLang: string) => {
           const parts = astro.url.pathname.split("/").slice(2)
           const route = [newLang, ...parts].join("/")
           return route;
        }
    };
}