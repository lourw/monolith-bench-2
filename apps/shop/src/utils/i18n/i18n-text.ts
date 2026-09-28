import type { Product } from '../../models/product.model';
import { asyncText } from '../async/async-text';
import { validateDate } from '../validate/validate-date';
import { clampLength, hashString, normalizeInput } from './i18n-text-helpers';

export interface I18nTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_TEXT_DEFAULTS: Required<I18nTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_TEXT_KIND = 'i18n-text' as const;

/**
 * Formats a raw value using the "lower" strategy.
 */
export function i18nText(
  value: string | number,
  options: I18nTextOptions = {},
): string {
  const opts: Required<I18nTextOptions> = { ...I18N_TEXT_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [asyncText, validateDate].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toLowerCase();
  return clampLength(transformed, opts.maxLength);
}

export function i18nTextMany(
  values: ReadonlyArray<string | number>,
  options: I18nTextOptions = {},
): string[] {
  return values.map((value) => i18nText(value, options));
}

export function isI18nTextValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nTextProduct(
  product: Product,
  options?: I18nTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nText(label, options);
}

export function compareI18nText(
  a: string | number,
  b: string | number,
): number {
  const left = i18nText(a);
  const right = i18nText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nText(
  values: ReadonlyArray<string | number>,
): I18nTextSummary {
  const formatted = i18nTextMany(values);
  let longest = '';
  let shortest = formatted[0] ?? '';
  let checksum = 0;
  for (const entry of formatted) {
    if (entry.length > longest.length) {
      longest = entry;
    }
    if (entry.length < shortest.length) {
      shortest = entry;
    }
    checksum = (checksum + hashString(entry)) % 1_000_003;
  }
  return { count: formatted.length, longest, shortest, checksum };
}

export function i18nTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
