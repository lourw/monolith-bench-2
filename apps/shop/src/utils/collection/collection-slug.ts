import type { Product } from '../../models/product.model';
import { mathAddress } from '../math/math-address';
import {
  clampLength,
  hashString,
  normalizeInput,
  padCode,
} from './collection-slug-helpers';

export interface CollectionSlugOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionSlugSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_SLUG_DEFAULTS: Required<CollectionSlugOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_SLUG_KIND = 'collection-slug' as const;

/**
 * Formats a raw value using the "padded" strategy.
 */
export function collectionSlug(
  value: string | number,
  options: CollectionSlugOptions = {},
): string {
  const opts: Required<CollectionSlugOptions> = {
    ...COLLECTION_SLUG_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [mathAddress].reduce<string>((acc, fn) => fn(acc), normalized);
  const transformed = padCode(staged, 4);
  return clampLength(transformed, opts.maxLength);
}

export function collectionSlugMany(
  values: ReadonlyArray<string | number>,
  options: CollectionSlugOptions = {},
): string[] {
  return values.map((value) => collectionSlug(value, options));
}

export function isCollectionSlugValid(
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

export function collectionSlugProduct(
  product: Product,
  options?: CollectionSlugOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionSlug(label, options);
}

export function compareCollectionSlug(
  a: string | number,
  b: string | number,
): number {
  const left = collectionSlug(a);
  const right = collectionSlug(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionSlug(
  values: ReadonlyArray<string | number>,
): CollectionSlugSummary {
  const formatted = collectionSlugMany(values);
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

export function collectionSlugKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionSlug(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
