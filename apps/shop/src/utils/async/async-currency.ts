import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './async-currency-helpers';

export interface AsyncCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_CURRENCY_DEFAULTS: Required<AsyncCurrencyOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_CURRENCY_KIND = 'async-currency' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function asyncCurrency(
  value: string | number,
  options: AsyncCurrencyOptions = {},
): string {
  const opts: Required<AsyncCurrencyOptions> = {
    ...ASYNC_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function asyncCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: AsyncCurrencyOptions = {},
): string[] {
  return values.map((value) => asyncCurrency(value, options));
}

export function isAsyncCurrencyValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncCurrencyProduct(
  product: Product,
  options?: AsyncCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncCurrency(label, options);
}

export function compareAsyncCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = asyncCurrency(a);
  const right = asyncCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncCurrency(
  values: ReadonlyArray<string | number>,
): AsyncCurrencySummary {
  const formatted = asyncCurrencyMany(values);
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

export function asyncCurrencyKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
