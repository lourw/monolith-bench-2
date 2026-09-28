import type { Product } from '../../models/product.model';
import { validateName } from '../validate/validate-name';
import { formatCurrency } from '../format/format-currency';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './math-currency-helpers';

export interface MathCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_CURRENCY_DEFAULTS: Required<MathCurrencyOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_CURRENCY_KIND = 'math-currency' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function mathCurrency(
  value: string | number,
  options: MathCurrencyOptions = {},
): string {
  const opts: Required<MathCurrencyOptions> = {
    ...MATH_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateName, formatCurrency].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function mathCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: MathCurrencyOptions = {},
): string[] {
  return values.map((value) => mathCurrency(value, options));
}

export function isMathCurrencyValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathCurrencyProduct(
  product: Product,
  options?: MathCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathCurrency(label, options);
}

export function compareMathCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = mathCurrency(a);
  const right = mathCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathCurrency(
  values: ReadonlyArray<string | number>,
): MathCurrencySummary {
  const formatted = mathCurrencyMany(values);
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

export function mathCurrencyKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
