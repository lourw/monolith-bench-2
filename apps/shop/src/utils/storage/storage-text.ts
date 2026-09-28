import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './storage-text-helpers';

export interface StorageTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_TEXT_DEFAULTS: Required<StorageTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_TEXT_KIND = 'storage-text' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function storageText(
  value: string | number,
  options: StorageTextOptions = {},
): string {
  const opts: Required<StorageTextOptions> = {
    ...STORAGE_TEXT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function storageTextMany(
  values: ReadonlyArray<string | number>,
  options: StorageTextOptions = {},
): string[] {
  return values.map((value) => storageText(value, options));
}

export function isStorageTextValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storageTextProduct(
  product: Product,
  options?: StorageTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageText(label, options);
}

export function compareStorageText(
  a: string | number,
  b: string | number,
): number {
  const left = storageText(a);
  const right = storageText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageText(
  values: ReadonlyArray<string | number>,
): StorageTextSummary {
  const formatted = storageTextMany(values);
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

export function storageTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
