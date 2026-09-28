import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './async-address-helpers';

export interface AsyncAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_ADDRESS_DEFAULTS: Required<AsyncAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_ADDRESS_KIND = 'async-address' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function asyncAddress(
  value: string | number,
  options: AsyncAddressOptions = {},
): string {
  const opts: Required<AsyncAddressOptions> = {
    ...ASYNC_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function asyncAddressMany(
  values: ReadonlyArray<string | number>,
  options: AsyncAddressOptions = {},
): string[] {
  return values.map((value) => asyncAddress(value, options));
}

export function isAsyncAddressValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncAddressProduct(
  product: Product,
  options?: AsyncAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncAddress(label, options);
}

export function compareAsyncAddress(
  a: string | number,
  b: string | number,
): number {
  const left = asyncAddress(a);
  const right = asyncAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncAddress(
  values: ReadonlyArray<string | number>,
): AsyncAddressSummary {
  const formatted = asyncAddressMany(values);
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

export function asyncAddressKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
