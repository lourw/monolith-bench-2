import type { Product } from '../../models/product.model';
import { mathText } from '../math/math-text';
import { validatePhone } from '../validate/validate-phone';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './collection-phone-helpers';

export interface CollectionPhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionPhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_PHONE_DEFAULTS: Required<CollectionPhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const COLLECTION_PHONE_KIND = 'collection-phone' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function collectionPhone(
  value: string | number,
  options: CollectionPhoneOptions = {},
): string {
  const opts: Required<CollectionPhoneOptions> = {
    ...COLLECTION_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [mathText, validatePhone].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function collectionPhoneMany(
  values: ReadonlyArray<string | number>,
  options: CollectionPhoneOptions = {},
): string[] {
  return values.map((value) => collectionPhone(value, options));
}

export function isCollectionPhoneValid(
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

export function collectionPhoneProduct(
  product: Product,
  options?: CollectionPhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionPhone(label, options);
}

export function compareCollectionPhone(
  a: string | number,
  b: string | number,
): number {
  const left = collectionPhone(a);
  const right = collectionPhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionPhone(
  values: ReadonlyArray<string | number>,
): CollectionPhoneSummary {
  const formatted = collectionPhoneMany(values);
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

export function collectionPhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionPhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
