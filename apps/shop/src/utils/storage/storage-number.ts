import type { Product } from '../../models/product.model';
import { formatPercent } from '../format/format-percent';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './storage-number-helpers';

export interface StorageNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_NUMBER_DEFAULTS: Required<StorageNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_NUMBER_KIND = 'storage-number' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function storageNumber(
  value: string | number,
  options: StorageNumberOptions = {},
): string {
  const opts: Required<StorageNumberOptions> = {
    ...STORAGE_NUMBER_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatPercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function storageNumberMany(
  values: ReadonlyArray<string | number>,
  options: StorageNumberOptions = {},
): string[] {
  return values.map((value) => storageNumber(value, options));
}

export function isStorageNumberValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storageNumberProduct(
  product: Product,
  options?: StorageNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageNumber(label, options);
}

export function compareStorageNumber(
  a: string | number,
  b: string | number,
): number {
  const left = storageNumber(a);
  const right = storageNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageNumber(
  values: ReadonlyArray<string | number>,
): StorageNumberSummary {
  const formatted = storageNumberMany(values);
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

export function storageNumberKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
