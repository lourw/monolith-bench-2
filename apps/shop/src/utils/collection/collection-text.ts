import type { Product } from '../../models/product.model';
import { mathAddress } from '../math/math-address';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './collection-text-helpers';

export interface CollectionTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_TEXT_DEFAULTS: Required<CollectionTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_TEXT_KIND = 'collection-text' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function collectionText(
  value: string | number,
  options: CollectionTextOptions = {},
): string {
  const opts: Required<CollectionTextOptions> = {
    ...COLLECTION_TEXT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [mathAddress].reduce<string>((acc, fn) => fn(acc), normalized);
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function collectionTextMany(
  values: ReadonlyArray<string | number>,
  options: CollectionTextOptions = {},
): string[] {
  return values.map((value) => collectionText(value, options));
}

export function isCollectionTextValid(
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

export function collectionTextProduct(
  product: Product,
  options?: CollectionTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionText(label, options);
}

export function compareCollectionText(
  a: string | number,
  b: string | number,
): number {
  const left = collectionText(a);
  const right = collectionText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionText(
  values: ReadonlyArray<string | number>,
): CollectionTextSummary {
  const formatted = collectionTextMany(values);
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

export function collectionTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
