import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  padCode,
} from './storage-percent-helpers';

export interface StoragePercentOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StoragePercentSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_PERCENT_DEFAULTS: Required<StoragePercentOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_PERCENT_KIND = 'storage-percent' as const;

/**
 * Formats a raw value using the "padded" strategy.
 */
export function storagePercent(
  value: string | number,
  options: StoragePercentOptions = {},
): string {
  const opts: Required<StoragePercentOptions> = {
    ...STORAGE_PERCENT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = padCode(staged, 4);
  return clampLength(transformed, opts.maxLength);
}

export function storagePercentMany(
  values: ReadonlyArray<string | number>,
  options: StoragePercentOptions = {},
): string[] {
  return values.map((value) => storagePercent(value, options));
}

export function isStoragePercentValid(
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

export function storagePercentProduct(
  product: Product,
  options?: StoragePercentOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storagePercent(label, options);
}

export function compareStoragePercent(
  a: string | number,
  b: string | number,
): number {
  const left = storagePercent(a);
  const right = storagePercent(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStoragePercent(
  values: ReadonlyArray<string | number>,
): StoragePercentSummary {
  const formatted = storagePercentMany(values);
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

export function storagePercentKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storagePercent(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
