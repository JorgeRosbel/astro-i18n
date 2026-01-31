#!/usr/bin/env node

import { readdirSync, readFileSync } from "fs";
import { join } from "path";

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

export function validateTranslations() {
  const args = process.argv.slice(2);

  const baseIndex = args.indexOf("--base");
  const baseLocale =
    baseIndex !== -1 && args[baseIndex + 1] ? args[baseIndex + 1] : "en";

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
    process.exit(1);
  }
}

validateTranslations();
