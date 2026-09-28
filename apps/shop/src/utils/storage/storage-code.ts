import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './storage-code-helpers';

export interface StorageCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_CODE_DEFAULTS: Required<StorageCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_CODE_KIND = 'storage-code' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function storageCode(
  value: string | number,
  options: StorageCodeOptions = {},
): string {
  const opts: Required<StorageCodeOptions> = {
    ...STORAGE_CODE_DEFAULTS,
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

export function storageCodeMany(
  values: ReadonlyArray<string | number>,
  options: StorageCodeOptions = {},
): string[] {
  return values.map((value) => storageCode(value, options));
}

export function isStorageCodeValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storageCodeProduct(
  product: Product,
  options?: StorageCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageCode(label, options);
}

export function compareStorageCode(
  a: string | number,
  b: string | number,
): number {
  const left = storageCode(a);
  const right = storageCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageCode(
  values: ReadonlyArray<string | number>,
): StorageCodeSummary {
  const formatted = storageCodeMany(values);
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

export function storageCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
