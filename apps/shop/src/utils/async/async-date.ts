import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './async-date-helpers';

export interface AsyncDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_DATE_DEFAULTS: Required<AsyncDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_DATE_KIND = 'async-date' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function asyncDate(
  value: string | number,
  options: AsyncDateOptions = {},
): string {
  const opts: Required<AsyncDateOptions> = {
    ...ASYNC_DATE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function asyncDateMany(
  values: ReadonlyArray<string | number>,
  options: AsyncDateOptions = {},
): string[] {
  return values.map((value) => asyncDate(value, options));
}

export function isAsyncDateValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncDateProduct(
  product: Product,
  options?: AsyncDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncDate(label, options);
}

export function compareAsyncDate(
  a: string | number,
  b: string | number,
): number {
  const left = asyncDate(a);
  const right = asyncDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncDate(
  values: ReadonlyArray<string | number>,
): AsyncDateSummary {
  const formatted = asyncDateMany(values);
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

export function asyncDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
