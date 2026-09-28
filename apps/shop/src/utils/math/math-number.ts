import type { Product } from '../../models/product.model';
import { validateCode } from '../validate/validate-code';
import { mathCurrency } from './math-currency';
import {
  clampLength,
  hashString,
  normalizeInput,
  padCode,
} from './math-number-helpers';

export interface MathNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_NUMBER_DEFAULTS: Required<MathNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_NUMBER_KIND = 'math-number' as const;

/**
 * Formats a raw value using the "padded" strategy.
 */
export function mathNumber(
  value: string | number,
  options: MathNumberOptions = {},
): string {
  const opts: Required<MathNumberOptions> = {
    ...MATH_NUMBER_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateCode, mathCurrency].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = padCode(staged, 4);
  return clampLength(transformed, opts.maxLength);
}

export function mathNumberMany(
  values: ReadonlyArray<string | number>,
  options: MathNumberOptions = {},
): string[] {
  return values.map((value) => mathNumber(value, options));
}

export function isMathNumberValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathNumberProduct(
  product: Product,
  options?: MathNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathNumber(label, options);
}

export function compareMathNumber(
  a: string | number,
  b: string | number,
): number {
  const left = mathNumber(a);
  const right = mathNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathNumber(
  values: ReadonlyArray<string | number>,
): MathNumberSummary {
  const formatted = mathNumberMany(values);
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

export function mathNumberKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
