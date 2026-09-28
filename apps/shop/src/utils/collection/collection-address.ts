import type { Product } from '../../models/product.model';
import { collectionCurrency } from './collection-currency';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './collection-address-helpers';

export interface CollectionAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_ADDRESS_DEFAULTS: Required<CollectionAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_ADDRESS_KIND = 'collection-address' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function collectionAddress(
  value: string | number,
  options: CollectionAddressOptions = {},
): string {
  const opts: Required<CollectionAddressOptions> = {
    ...COLLECTION_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [collectionCurrency].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function collectionAddressMany(
  values: ReadonlyArray<string | number>,
  options: CollectionAddressOptions = {},
): string[] {
  return values.map((value) => collectionAddress(value, options));
}

export function isCollectionAddressValid(
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

export function collectionAddressProduct(
  product: Product,
  options?: CollectionAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionAddress(label, options);
}

export function compareCollectionAddress(
  a: string | number,
  b: string | number,
): number {
  const left = collectionAddress(a);
  const right = collectionAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionAddress(
  values: ReadonlyArray<string | number>,
): CollectionAddressSummary {
  const formatted = collectionAddressMany(values);
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

export function collectionAddressKeyed<
  T extends Record<string, string | number>,
>(records: ReadonlyArray<T>, key: keyof T): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
