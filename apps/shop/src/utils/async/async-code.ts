import type { Product } from '../../models/product.model';
import { asyncCurrency } from './async-currency';
import { mathName } from '../math/math-name';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './async-code-helpers';

export interface AsyncCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_CODE_DEFAULTS: Required<AsyncCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_CODE_KIND = 'async-code' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function asyncCode(
  value: string | number,
  options: AsyncCodeOptions = {},
): string {
  const opts: Required<AsyncCodeOptions> = {
    ...ASYNC_CODE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [asyncCurrency, mathName].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function asyncCodeMany(
  values: ReadonlyArray<string | number>,
  options: AsyncCodeOptions = {},
): string[] {
  return values.map((value) => asyncCode(value, options));
}

export function isAsyncCodeValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncCodeProduct(
  product: Product,
  options?: AsyncCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncCode(label, options);
}

export function compareAsyncCode(
  a: string | number,
  b: string | number,
): number {
  const left = asyncCode(a);
  const right = asyncCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncCode(
  values: ReadonlyArray<string | number>,
): AsyncCodeSummary {
  const formatted = asyncCodeMany(values);
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

export function asyncCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
