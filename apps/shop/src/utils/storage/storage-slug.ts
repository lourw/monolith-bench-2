import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './storage-slug-helpers';

export interface StorageSlugOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageSlugSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_SLUG_DEFAULTS: Required<StorageSlugOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_SLUG_KIND = 'storage-slug' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function storageSlug(
  value: string | number,
  options: StorageSlugOptions = {},
): string {
  const opts: Required<StorageSlugOptions> = {
    ...STORAGE_SLUG_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function storageSlugMany(
  values: ReadonlyArray<string | number>,
  options: StorageSlugOptions = {},
): string[] {
  return values.map((value) => storageSlug(value, options));
}

export function isStorageSlugValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storageSlugProduct(
  product: Product,
  options?: StorageSlugOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageSlug(label, options);
}

export function compareStorageSlug(
  a: string | number,
  b: string | number,
): number {
  const left = storageSlug(a);
  const right = storageSlug(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageSlug(
  values: ReadonlyArray<string | number>,
): StorageSlugSummary {
  const formatted = storageSlugMany(values);
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

export function storageSlugKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageSlug(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
