import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './collection-name-helpers';

export interface CollectionNameOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionNameSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_NAME_DEFAULTS: Required<CollectionNameOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_NAME_KIND = 'collection-name' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function collectionName(
  value: string | number,
  options: CollectionNameOptions = {},
): string {
  const opts: Required<CollectionNameOptions> = {
    ...COLLECTION_NAME_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function collectionNameMany(
  values: ReadonlyArray<string | number>,
  options: CollectionNameOptions = {},
): string[] {
  return values.map((value) => collectionName(value, options));
}

export function isCollectionNameValid(
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

export function collectionNameProduct(
  product: Product,
  options?: CollectionNameOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionName(label, options);
}

export function compareCollectionName(
  a: string | number,
  b: string | number,
): number {
  const left = collectionName(a);
  const right = collectionName(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionName(
  values: ReadonlyArray<string | number>,
): CollectionNameSummary {
  const formatted = collectionNameMany(values);
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

export function collectionNameKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionName(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
