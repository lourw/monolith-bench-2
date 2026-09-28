import type { Product } from '../../models/product.model';
import { validatePhone } from '../validate/validate-phone';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './collection-currency-helpers';

export interface CollectionCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface CollectionCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const COLLECTION_CURRENCY_DEFAULTS: Required<CollectionCurrencyOptions> =
  {
    locale: 'en-US',
    maxLength: 64,
    fallback: '—',
  };

export const COLLECTION_CURRENCY_KIND = 'collection-currency' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function collectionCurrency(
  value: string | number,
  options: CollectionCurrencyOptions = {},
): string {
  const opts: Required<CollectionCurrencyOptions> = {
    ...COLLECTION_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validatePhone].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function collectionCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: CollectionCurrencyOptions = {},
): string[] {
  return values.map((value) => collectionCurrency(value, options));
}

export function isCollectionCurrencyValid(
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

export function collectionCurrencyProduct(
  product: Product,
  options?: CollectionCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return collectionCurrency(label, options);
}

export function compareCollectionCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = collectionCurrency(a);
  const right = collectionCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeCollectionCurrency(
  values: ReadonlyArray<string | number>,
): CollectionCurrencySummary {
  const formatted = collectionCurrencyMany(values);
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

export function collectionCurrencyKeyed<
  T extends Record<string, string | number>,
>(records: ReadonlyArray<T>, key: keyof T): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = collectionCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
