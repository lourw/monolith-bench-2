import type { Product } from '../../models/product.model';
import { formatPhone } from '../format/format-phone';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './validate-currency-helpers';

export interface ValidateCurrencyOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateCurrencySummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_CURRENCY_DEFAULTS: Required<ValidateCurrencyOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_CURRENCY_KIND = 'validate-currency' as const;

/**
 * Formats a raw value using the "lower" strategy.
 */
export function validateCurrency(
  value: string | number,
  options: ValidateCurrencyOptions = {},
): string {
  const opts: Required<ValidateCurrencyOptions> = {
    ...VALIDATE_CURRENCY_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatPhone].reduce<string>((acc, fn) => fn(acc), normalized);
  const transformed = staged.toLowerCase();
  return clampLength(transformed, opts.maxLength);
}

export function validateCurrencyMany(
  values: ReadonlyArray<string | number>,
  options: ValidateCurrencyOptions = {},
): string[] {
  return values.map((value) => validateCurrency(value, options));
}

export function isValidateCurrencyValid(
  value: unknown,
): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validateCurrencyProduct(
  product: Product,
  options?: ValidateCurrencyOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateCurrency(label, options);
}

export function compareValidateCurrency(
  a: string | number,
  b: string | number,
): number {
  const left = validateCurrency(a);
  const right = validateCurrency(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateCurrency(
  values: ReadonlyArray<string | number>,
): ValidateCurrencySummary {
  const formatted = validateCurrencyMany(values);
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

export function validateCurrencyKeyed<
  T extends Record<string, string | number>,
>(records: ReadonlyArray<T>, key: keyof T): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateCurrency(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
