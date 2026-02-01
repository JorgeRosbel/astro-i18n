import { describe, it, expect, beforeEach, vi } from "vitest";
import { useI18n } from "../src/core";
import { readFileSync } from "fs";

vi.mock("fs", async (importOriginal) => {
  const rest = await importOriginal<typeof import("fs")>();
  return {
    ...rest,
    readFileSync: vi.fn(),
  };
});

describe("Core Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should prioritize forced locale in SSG mode", () => {
    vi.mocked(readFileSync).mockReturnValue(`{"title": { "base": "foo" }}`);

    const { t, locale } = useI18n({ ssg: { locale: "en" } });

    expect(locale).toBe("en");
    expect(t("title.base" as any)).toBe("foo");
  });

  it("should resolve locale from Astro params", () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "bar" }}`);

    const { t, locale } = useI18n({
      ssg: { astro: { params: { lang: "pt" } } as any },
    });

    expect(locale).toBe("pt");
    expect(t("title.base" as any)).toBe("bar");
  });

  it("should resolve locale from Astro currentLocale", () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "baz" }}`);

    const { t, locale } = useI18n({
      ssg: { astro: { currentLocale: "fr" } as any },
    });

    expect(locale).toBe("fr");
    expect(t("title.base" as any)).toBe("baz");
  });

  it("should use 'en' as default locale when no configuration is provided", () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "foo" }}`);

    const { t, locale } = useI18n({
      ssg: {
        astro: { currentLocale: undefined, params: { lang: undefined } } as any,
      },
    });

    expect(locale).toBe("en");
    expect(t("title.base" as any)).toBe("foo");
  });
});
