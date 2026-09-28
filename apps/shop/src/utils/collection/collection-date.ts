import type { Product } from '../../models/product.model';
import { validateCode } from '../validate/validate-code';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './collection-date-helpers';

export interface CollectionDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_DATE_DEFAULTS: Required<CollectionDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_DATE_KIND = 'collection-date' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function collectionDate(
  value: string | number,
  options: CollectionDateOptions = {},
): string {
  const opts: Required<CollectionDateOptions> = {
    ...COLLECTION_DATE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateCode].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function collectionDateMany(
  values: ReadonlyArray<string | number>,
  options: CollectionDateOptions = {},
): string[] {
  return values.map((value) => collectionDate(value, options));
}

export function isCollectionDateValid(
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

export function collectionDateProduct(
  product: Product,
  options?: CollectionDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionDate(label, options);
}

export function compareCollectionDate(
  a: string | number,
  b: string | number,
): number {
  const left = collectionDate(a);
  const right = collectionDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionDate(
  values: ReadonlyArray<string | number>,
): CollectionDateSummary {
  const formatted = collectionDateMany(values);
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

export function collectionDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
