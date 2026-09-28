import type { Product } from '../../models/product.model';
import { validateSlug } from '../validate/validate-slug';
import { validatePercent } from '../validate/validate-percent';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './collection-number-helpers';

export interface CollectionNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_NUMBER_DEFAULTS: Required<CollectionNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_NUMBER_KIND = 'collection-number' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function collectionNumber(
  value: string | number,
  options: CollectionNumberOptions = {},
): string {
  const opts: Required<CollectionNumberOptions> = {
    ...COLLECTION_NUMBER_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateSlug, validatePercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function collectionNumberMany(
  values: ReadonlyArray<string | number>,
  options: CollectionNumberOptions = {},
): string[] {
  return values.map((value) => collectionNumber(value, options));
}

export function isCollectionNumberValid(
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

export function collectionNumberProduct(
  product: Product,
  options?: CollectionNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionNumber(label, options);
}

export function compareCollectionNumber(
  a: string | number,
  b: string | number,
): number {
  const left = collectionNumber(a);
  const right = collectionNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionNumber(
  values: ReadonlyArray<string | number>,
): CollectionNumberSummary {
  const formatted = collectionNumberMany(values);
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

export function collectionNumberKeyed<
  T extends Record<string, string | number>,
>(records: ReadonlyArray<T>, key: keyof T): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
