import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './async-text-helpers';

export interface AsyncTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_TEXT_DEFAULTS: Required<AsyncTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_TEXT_KIND = 'async-text' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function asyncText(
  value: string | number,
  options: AsyncTextOptions = {},
): string {
  const opts: Required<AsyncTextOptions> = {
    ...ASYNC_TEXT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function asyncTextMany(
  values: ReadonlyArray<string | number>,
  options: AsyncTextOptions = {},
): string[] {
  return values.map((value) => asyncText(value, options));
}

export function isAsyncTextValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncTextProduct(
  product: Product,
  options?: AsyncTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncText(label, options);
}

export function compareAsyncText(
  a: string | number,
  b: string | number,
): number {
  const left = asyncText(a);
  const right = asyncText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncText(
  values: ReadonlyArray<string | number>,
): AsyncTextSummary {
  const formatted = asyncTextMany(values);
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

export function asyncTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
