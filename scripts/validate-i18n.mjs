import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const messagesDir = path.join(root, "messages");
const baseLocale = "en";
const locales = fs.readdirSync(messagesDir).filter((entry) => {
  const fullPath = path.join(messagesDir, entry);
  return fs.statSync(fullPath).isDirectory();
});

function listJsonFiles(locale) {
  return fs
    .readdirSync(path.join(messagesDir, locale))
    .filter((entry) => entry.endsWith(".json"))
    .sort();
}

function readJson(locale, file) {
  const fullPath = path.join(messagesDir, locale, file);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function compareShape(baseValue, candidateValue, pointer) {
  const baseIsArray = Array.isArray(baseValue);
  const candidateIsArray = Array.isArray(candidateValue);

  if (baseIsArray !== candidateIsArray) {
    throw new Error(`${pointer}: expected ${baseIsArray ? "array" : typeof baseValue}, received ${candidateIsArray ? "array" : typeof candidateValue}`);
  }

  if (baseValue === null || candidateValue === null) {
    if (baseValue !== candidateValue) {
      throw new Error(`${pointer}: null mismatch`);
    }
    return;
  }

  if (baseIsArray) {
    if (baseValue.length !== candidateValue.length) {
      throw new Error(`${pointer}: expected array length ${baseValue.length}, received ${candidateValue.length}`);
    }

    baseValue.forEach((entry, index) => {
      compareShape(entry, candidateValue[index], `${pointer}[${index}]`);
    });
    return;
  }

  if (typeof baseValue === "object") {
    const baseKeys = Object.keys(baseValue).sort();
    const candidateKeys = Object.keys(candidateValue).sort();

    if (baseKeys.join("|") !== candidateKeys.join("|")) {
      throw new Error(`${pointer}: key mismatch. expected ${baseKeys.join(", ")}, received ${candidateKeys.join(", ")}`);
    }

    baseKeys.forEach((key) => {
      compareShape(baseValue[key], candidateValue[key], `${pointer}.${key}`);
    });
    return;
  }

  if (typeof baseValue !== typeof candidateValue) {
    throw new Error(`${pointer}: expected ${typeof baseValue}, received ${typeof candidateValue}`);
  }
}

const baseFiles = listJsonFiles(baseLocale);

for (const locale of locales) {
  if (locale === baseLocale) continue;

  const localeFiles = listJsonFiles(locale);
  if (baseFiles.join("|") !== localeFiles.join("|")) {
    throw new Error(`messages/${locale}: file mismatch with messages/${baseLocale}`);
  }

  for (const file of baseFiles) {
    const baseJson = readJson(baseLocale, file);
    const localeJson = readJson(locale, file);
    compareShape(baseJson, localeJson, `${locale}/${file}`);
  }
}

console.log(`Validated ${baseFiles.length} namespaces across ${locales.length} locales.`);
