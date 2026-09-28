import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './validate-number-helpers';

export interface ValidateNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_NUMBER_DEFAULTS: Required<ValidateNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_NUMBER_KIND = 'validate-number' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function validateNumber(
  value: string | number,
  options: ValidateNumberOptions = {},
): string {
  const opts: Required<ValidateNumberOptions> = {
    ...VALIDATE_NUMBER_DEFAULTS,
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

export function validateNumberMany(
  values: ReadonlyArray<string | number>,
  options: ValidateNumberOptions = {},
): string[] {
  return values.map((value) => validateNumber(value, options));
}

export function isValidateNumberValid(
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

export function validateNumberProduct(
  product: Product,
  options?: ValidateNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateNumber(label, options);
}

export function compareValidateNumber(
  a: string | number,
  b: string | number,
): number {
  const left = validateNumber(a);
  const right = validateNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateNumber(
  values: ReadonlyArray<string | number>,
): ValidateNumberSummary {
  const formatted = validateNumberMany(values);
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

export function validateNumberKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
