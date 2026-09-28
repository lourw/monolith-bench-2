import type { Product } from '../../models/product.model';
import { asyncPercent } from './async-percent';
import { clampLength, hashString, normalizeInput } from './async-phone-helpers';

export interface AsyncPhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncPhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_PHONE_DEFAULTS: Required<AsyncPhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_PHONE_KIND = 'async-phone' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function asyncPhone(
  value: string | number,
  options: AsyncPhoneOptions = {},
): string {
  const opts: Required<AsyncPhoneOptions> = {
    ...ASYNC_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [asyncPercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function asyncPhoneMany(
  values: ReadonlyArray<string | number>,
  options: AsyncPhoneOptions = {},
): string[] {
  return values.map((value) => asyncPhone(value, options));
}

export function isAsyncPhoneValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncPhoneProduct(
  product: Product,
  options?: AsyncPhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncPhone(label, options);
}

export function compareAsyncPhone(
  a: string | number,
  b: string | number,
): number {
  const left = asyncPhone(a);
  const right = asyncPhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncPhone(
  values: ReadonlyArray<string | number>,
): AsyncPhoneSummary {
  const formatted = asyncPhoneMany(values);
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

export function asyncPhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncPhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
