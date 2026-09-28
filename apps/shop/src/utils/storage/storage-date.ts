import type { Product } from '../../models/product.model';
import { validateAddress } from '../validate/validate-address';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './storage-date-helpers';

export interface StorageDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_DATE_DEFAULTS: Required<StorageDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_DATE_KIND = 'storage-date' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function storageDate(
  value: string | number,
  options: StorageDateOptions = {},
): string {
  const opts: Required<StorageDateOptions> = {
    ...STORAGE_DATE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateAddress].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function storageDateMany(
  values: ReadonlyArray<string | number>,
  options: StorageDateOptions = {},
): string[] {
  return values.map((value) => storageDate(value, options));
}

export function isStorageDateValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storageDateProduct(
  product: Product,
  options?: StorageDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageDate(label, options);
}

export function compareStorageDate(
  a: string | number,
  b: string | number,
): number {
  const left = storageDate(a);
  const right = storageDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageDate(
  values: ReadonlyArray<string | number>,
): StorageDateSummary {
  const formatted = storageDateMany(values);
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

export function storageDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
