import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './format-currency-helpers';

export interface FormatCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_CURRENCY_DEFAULTS: Required<FormatCurrencyOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_CURRENCY_KIND = 'format-currency' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function formatCurrency(
  value: string | number,
  options: FormatCurrencyOptions = {},
): string {
  const opts: Required<FormatCurrencyOptions> = {
    ...FORMAT_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: FormatCurrencyOptions = {},
): string[] {
  return values.map((value) => formatCurrency(value, options));
}

export function isFormatCurrencyValid(
  value: unknown,
): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatCurrencyProduct(
  product: Product,
  options?: FormatCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatCurrency(label, options);
}

export function compareFormatCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = formatCurrency(a);
  const right = formatCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatCurrency(
  values: ReadonlyArray<string | number>,
): FormatCurrencySummary {
  const formatted = formatCurrencyMany(values);
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

export function formatCurrencyKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
