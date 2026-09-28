import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './storage-name-helpers';

export interface StorageNameOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageNameSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_NAME_DEFAULTS: Required<StorageNameOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_NAME_KIND = 'storage-name' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function storageName(
  value: string | number,
  options: StorageNameOptions = {},
): string {
  const opts: Required<StorageNameOptions> = {
    ...STORAGE_NAME_DEFAULTS,
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

export function storageNameMany(
  values: ReadonlyArray<string | number>,
  options: StorageNameOptions = {},
): string[] {
  return values.map((value) => storageName(value, options));
}

export function isStorageNameValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storageNameProduct(
  product: Product,
  options?: StorageNameOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageName(label, options);
}

export function compareStorageName(
  a: string | number,
  b: string | number,
): number {
  const left = storageName(a);
  const right = storageName(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageName(
  values: ReadonlyArray<string | number>,
): StorageNameSummary {
  const formatted = storageNameMany(values);
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

export function storageNameKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageName(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
