import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useI18n } from '../src/core';
import { readFileSync } from 'fs';

vi.mock('fs', async importOriginal => {
  const rest = await importOriginal<typeof import('fs')>();
  return {
    ...rest,
    readFileSync: vi.fn(),
  };
});

describe('Core Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should prioritize forced locale in SSG mode', () => {
    vi.mocked(readFileSync).mockReturnValue(`{"title": { "base": "foo" }}`);

    const { t, locale } = useI18n({ ssg: { locale: 'en' } });

    expect(locale).toBe('en');
    expect(t('title.base' as any)).toBe('foo');
  });

  it('should resolve locale from Astro params', () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "bar" }}`);

    const { t, locale } = useI18n({
      ssg: { astro: { params: { lang: 'pt' } } as any },
    });

    expect(locale).toBe('pt');
    expect(t('title.base' as any)).toBe('bar');
  });

  it('should resolve locale from Astro currentLocale', () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "baz" }}`);

    const { t, locale } = useI18n({
      ssg: { astro: { currentLocale: 'fr' } as any },
    });

    expect(locale).toBe('fr');
    expect(t('title.base' as any)).toBe('baz');
  });

  it("should use 'en' as default locale when no configuration is provided", () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "foo" }}`);

    const { t, locale } = useI18n({
      ssg: {
        astro: { currentLocale: undefined, params: { lang: undefined } } as any,
      },
    });

    expect(locale).toBe('en');
    expect(t('title.base' as any)).toBe('foo');
  });

  it('should handle SSR mode', () => {
    const translations = { title: { base: 'baz' } };

    const { t, locale } = useI18n({
      ssr: { translations, locale: 'fu' },
    });

    expect(locale).toBe('fu');
    expect(t('title.base' as any)).toBe('baz');
  });

  it('should ignore cache and reload translation files in development mode', () => {
    // 1. Forzamos el entorno de desarrollo
    vi.stubEnv('NODE_ENV', 'development');

    // 2. Mockeamos el retorno del archivo
    vi.mocked(readFileSync).mockReturnValue(`{"title": "test"}`);

    // 3. Primera llamada
    useI18n({ ssg: { locale: 'en' } });

    // 4. Segunda llamada (con el mismo locale)
    useI18n({ ssg: { locale: 'en' } });

    // 5. Verificamos que leyó el disco las dos veces
    // Si el cache funcionara, esto sería 1
    expect(readFileSync).toHaveBeenCalledTimes(2);

    // Limpiamos el entorno
    vi.unstubAllEnvs();
  });

  it('should use cache and not reload files in production mode', () => {
    // 1. Set environment to production
    vi.stubEnv('NODE_ENV', 'production');

    vi.mocked(readFileSync).mockReturnValue(`{"title": "test"}`);

    // 2. Call useI18n multiple times for the same locale
    // We use a unique locale like 'de' to ensure the cache is empty for this test
    useI18n({ ssg: { locale: 'de' } });
    useI18n({ ssg: { locale: 'de' } });
    useI18n({ ssg: { locale: 'de' } });

    // 3. Verify readFileSync was called ONLY ONCE
    expect(readFileSync).toHaveBeenCalledTimes(1);

    vi.unstubAllEnvs();
  });

  it('should correctly interpolate parameters into translation strings', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "bar {{count}}" }}`);

    const { t, locale } = useI18n({
      ssg: { astro: { params: { lang: 'pt' } } as any },
    });

    expect(locale).toBe('pt');
    expect(t('title.base', { count: 3 })).toBe('bar 3');
    vi.unstubAllEnvs();
  });
});
