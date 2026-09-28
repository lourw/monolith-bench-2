import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './collection-percent-helpers';

export interface CollectionPercentOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionPercentSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_PERCENT_DEFAULTS: Required<CollectionPercentOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_PERCENT_KIND = 'collection-percent' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function collectionPercent(
  value: string | number,
  options: CollectionPercentOptions = {},
): string {
  const opts: Required<CollectionPercentOptions> = {
    ...COLLECTION_PERCENT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function collectionPercentMany(
  values: ReadonlyArray<string | number>,
  options: CollectionPercentOptions = {},
): string[] {
  return values.map((value) => collectionPercent(value, options));
}

export function isCollectionPercentValid(
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

export function collectionPercentProduct(
  product: Product,
  options?: CollectionPercentOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionPercent(label, options);
}

export function compareCollectionPercent(
  a: string | number,
  b: string | number,
): number {
  const left = collectionPercent(a);
  const right = collectionPercent(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionPercent(
  values: ReadonlyArray<string | number>,
): CollectionPercentSummary {
  const formatted = collectionPercentMany(values);
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

export function collectionPercentKeyed<
  T extends Record<string, string | number>,
>(records: ReadonlyArray<T>, key: keyof T): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionPercent(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
