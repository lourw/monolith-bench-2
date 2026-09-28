import type { Product } from '../../models/product.model';
import { formatCurrency } from '../format/format-currency';
import { formatText } from '../format/format-text';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './math-address-helpers';

export interface MathAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_ADDRESS_DEFAULTS: Required<MathAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_ADDRESS_KIND = 'math-address' as const;

/**
 * Formats a raw value using the "lower" strategy.
 */
export function mathAddress(
  value: string | number,
  options: MathAddressOptions = {},
): string {
  const opts: Required<MathAddressOptions> = {
    ...MATH_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatCurrency, formatText].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toLowerCase();
  return clampLength(transformed, opts.maxLength);
}

export function mathAddressMany(
  values: ReadonlyArray<string | number>,
  options: MathAddressOptions = {},
): string[] {
  return values.map((value) => mathAddress(value, options));
}

export function isMathAddressValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathAddressProduct(
  product: Product,
  options?: MathAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathAddress(label, options);
}

export function compareMathAddress(
  a: string | number,
  b: string | number,
): number {
  const left = mathAddress(a);
  const right = mathAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathAddress(
  values: ReadonlyArray<string | number>,
): MathAddressSummary {
  const formatted = mathAddressMany(values);
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

export function mathAddressKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
