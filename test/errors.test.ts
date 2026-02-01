import { describe, it, expect, beforeEach, vi } from "vitest";
import { useI18n } from "../src/core";
import { readFileSync } from "fs";

vi.mock("fs", () => ({
  default: {
    readFileSync: vi.fn(),
  },
}));

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
});
