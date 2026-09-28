import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './async-number-helpers';

export interface AsyncNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_NUMBER_DEFAULTS: Required<AsyncNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_NUMBER_KIND = 'async-number' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function asyncNumber(
  value: string | number,
  options: AsyncNumberOptions = {},
): string {
  const opts: Required<AsyncNumberOptions> = {
    ...ASYNC_NUMBER_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function asyncNumberMany(
  values: ReadonlyArray<string | number>,
  options: AsyncNumberOptions = {},
): string[] {
  return values.map((value) => asyncNumber(value, options));
}

export function isAsyncNumberValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncNumberProduct(
  product: Product,
  options?: AsyncNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncNumber(label, options);
}

export function compareAsyncNumber(
  a: string | number,
  b: string | number,
): number {
  const left = asyncNumber(a);
  const right = asyncNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncNumber(
  values: ReadonlyArray<string | number>,
): AsyncNumberSummary {
  const formatted = asyncNumberMany(values);
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

export function asyncNumberKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
