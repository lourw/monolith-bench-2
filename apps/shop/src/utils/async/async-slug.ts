import type { Product } from '../../models/product.model';
import { collectionPhone } from '../collection/collection-phone';
import { asyncCurrency } from './async-currency';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './async-slug-helpers';

export interface AsyncSlugOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncSlugSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_SLUG_DEFAULTS: Required<AsyncSlugOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_SLUG_KIND = 'async-slug' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function asyncSlug(
  value: string | number,
  options: AsyncSlugOptions = {},
): string {
  const opts: Required<AsyncSlugOptions> = {
    ...ASYNC_SLUG_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [collectionPhone, asyncCurrency].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function asyncSlugMany(
  values: ReadonlyArray<string | number>,
  options: AsyncSlugOptions = {},
): string[] {
  return values.map((value) => asyncSlug(value, options));
}

export function isAsyncSlugValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncSlugProduct(
  product: Product,
  options?: AsyncSlugOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncSlug(label, options);
}

export function compareAsyncSlug(
  a: string | number,
  b: string | number,
): number {
  const left = asyncSlug(a);
  const right = asyncSlug(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncSlug(
  values: ReadonlyArray<string | number>,
): AsyncSlugSummary {
  const formatted = asyncSlugMany(values);
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

export function asyncSlugKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncSlug(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
