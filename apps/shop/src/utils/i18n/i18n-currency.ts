import type { Product } from '../../models/product.model';
import { formatPercent } from '../format/format-percent';
import { mathCode } from '../math/math-code';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './i18n-currency-helpers';

export interface I18nCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_CURRENCY_DEFAULTS: Required<I18nCurrencyOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_CURRENCY_KIND = 'i18n-currency' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function i18nCurrency(
  value: string | number,
  options: I18nCurrencyOptions = {},
): string {
  const opts: Required<I18nCurrencyOptions> = {
    ...I18N_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatPercent, mathCode].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function i18nCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: I18nCurrencyOptions = {},
): string[] {
  return values.map((value) => i18nCurrency(value, options));
}

export function isI18nCurrencyValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nCurrencyProduct(
  product: Product,
  options?: I18nCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nCurrency(label, options);
}

export function compareI18nCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = i18nCurrency(a);
  const right = i18nCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nCurrency(
  values: ReadonlyArray<string | number>,
): I18nCurrencySummary {
  const formatted = i18nCurrencyMany(values);
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

export function i18nCurrencyKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
