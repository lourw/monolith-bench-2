import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './storage-currency-helpers';

export interface StorageCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_CURRENCY_DEFAULTS: Required<StorageCurrencyOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_CURRENCY_KIND = 'storage-currency' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function storageCurrency(
  value: string | number,
  options: StorageCurrencyOptions = {},
): string {
  const opts: Required<StorageCurrencyOptions> = {
    ...STORAGE_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function storageCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: StorageCurrencyOptions = {},
): string[] {
  return values.map((value) => storageCurrency(value, options));
}

export function isStorageCurrencyValid(
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

export function storageCurrencyProduct(
  product: Product,
  options?: StorageCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageCurrency(label, options);
}

export function compareStorageCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = storageCurrency(a);
  const right = storageCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageCurrency(
  values: ReadonlyArray<string | number>,
): StorageCurrencySummary {
  const formatted = storageCurrencyMany(values);
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

export function storageCurrencyKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
