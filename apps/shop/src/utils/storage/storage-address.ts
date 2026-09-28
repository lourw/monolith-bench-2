import type { Product } from '../../models/product.model';
import { mathCode } from '../math/math-code';
import { asyncNumber } from '../async/async-number';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './storage-address-helpers';

export interface StorageAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StorageAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_ADDRESS_DEFAULTS: Required<StorageAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_ADDRESS_KIND = 'storage-address' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function storageAddress(
  value: string | number,
  options: StorageAddressOptions = {},
): string {
  const opts: Required<StorageAddressOptions> = {
    ...STORAGE_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [mathCode, asyncNumber].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function storageAddressMany(
  values: ReadonlyArray<string | number>,
  options: StorageAddressOptions = {},
): string[] {
  return values.map((value) => storageAddress(value, options));
}

export function isStorageAddressValid(
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

export function storageAddressProduct(
  product: Product,
  options?: StorageAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storageAddress(label, options);
}

export function compareStorageAddress(
  a: string | number,
  b: string | number,
): number {
  const left = storageAddress(a);
  const right = storageAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStorageAddress(
  values: ReadonlyArray<string | number>,
): StorageAddressSummary {
  const formatted = storageAddressMany(values);
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

export function storageAddressKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storageAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
