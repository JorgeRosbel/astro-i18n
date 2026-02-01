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

describe("Error Handling Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if no parameters are provided to useI18n", () => {
    expect(() => {
      useI18n({});
    }).toThrow(
      "[astro-i18n] You must provide either an 'ssg' or 'ssr' configuration object.",
    );
  });

  it("should throw an error if both SSG and SSR parameters are provided simultaneously", () => {
    expect(() => {
      useI18n({ ssg: {} as any, ssr: {} as any });
    }).toThrow(
      "[astro-i18n] You cannot provide both 'ssg' and 'ssr' configurations. Choose one based on your rendering strategy.",
    );
  });

  it("should throw an error if a non-existent translation key is provided", () => {
    vi.mocked(readFileSync).mockReturnValueOnce(`{"title": { "base": "bar" }}`);
    const key = "foo.fi";

    expect(() => {
      const { t } = useI18n({
        ssg: { astro: { params: { lang: "pt" } } as any },
      });
      t(key as any);
    }).toThrow(
      `[astro-i18n] Missing translation key: "${key}" for locale: "pt".`,
    );
  });
});
