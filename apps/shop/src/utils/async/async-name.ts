import type { Product } from '../../models/product.model';
import { collectionCurrency } from '../collection/collection-currency';
import { clampLength, hashString, normalizeInput } from './async-name-helpers';

export interface AsyncNameOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncNameSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_NAME_DEFAULTS: Required<AsyncNameOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_NAME_KIND = 'async-name' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function asyncName(
  value: string | number,
  options: AsyncNameOptions = {},
): string {
  const opts: Required<AsyncNameOptions> = {
    ...ASYNC_NAME_DEFAULTS,
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
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function asyncNameMany(
  values: ReadonlyArray<string | number>,
  options: AsyncNameOptions = {},
): string[] {
  return values.map((value) => asyncName(value, options));
}

export function isAsyncNameValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncNameProduct(
  product: Product,
  options?: AsyncNameOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncName(label, options);
}

export function compareAsyncName(
  a: string | number,
  b: string | number,
): number {
  const left = asyncName(a);
  const right = asyncName(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncName(
  values: ReadonlyArray<string | number>,
): AsyncNameSummary {
  const formatted = asyncNameMany(values);
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

export function asyncNameKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncName(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
