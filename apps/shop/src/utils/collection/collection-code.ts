import type { Product } from '../../models/product.model';
import { mathCurrency } from '../math/math-currency';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './collection-code-helpers';

export interface CollectionCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_CODE_DEFAULTS: Required<CollectionCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_CODE_KIND = 'collection-code' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function collectionCode(
  value: string | number,
  options: CollectionCodeOptions = {},
): string {
  const opts: Required<CollectionCodeOptions> = {
    ...COLLECTION_CODE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [mathCurrency].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function collectionCodeMany(
  values: ReadonlyArray<string | number>,
  options: CollectionCodeOptions = {},
): string[] {
  return values.map((value) => collectionCode(value, options));
}

export function isCollectionCodeValid(
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

export function collectionCodeProduct(
  product: Product,
  options?: CollectionCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionCode(label, options);
}

export function compareCollectionCode(
  a: string | number,
  b: string | number,
): number {
  const left = collectionCode(a);
  const right = collectionCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionCode(
  values: ReadonlyArray<string | number>,
): CollectionCodeSummary {
  const formatted = collectionCodeMany(values);
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

export function collectionCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
