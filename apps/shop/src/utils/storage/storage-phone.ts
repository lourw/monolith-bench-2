import type { Product } from '../../models/product.model';
import { storageText } from './storage-text';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './storage-phone-helpers';

export interface StoragePhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface StoragePhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const STORAGE_PHONE_DEFAULTS: Required<StoragePhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const STORAGE_PHONE_KIND = 'storage-phone' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function storagePhone(
  value: string | number,
  options: StoragePhoneOptions = {},
): string {
  const opts: Required<StoragePhoneOptions> = {
    ...STORAGE_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [storageText].reduce<string>((acc, fn) => fn(acc), normalized);
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function storagePhoneMany(
  values: ReadonlyArray<string | number>,
  options: StoragePhoneOptions = {},
): string[] {
  return values.map((value) => storagePhone(value, options));
}

export function isStoragePhoneValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function storagePhoneProduct(
  product: Product,
  options?: StoragePhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return storagePhone(label, options);
}

export function compareStoragePhone(
  a: string | number,
  b: string | number,
): number {
  const left = storagePhone(a);
  const right = storagePhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeStoragePhone(
  values: ReadonlyArray<string | number>,
): StoragePhoneSummary {
  const formatted = storagePhoneMany(values);
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

export function storagePhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = storagePhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
