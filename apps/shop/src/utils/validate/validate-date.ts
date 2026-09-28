import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './validate-date-helpers';

export interface ValidateDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_DATE_DEFAULTS: Required<ValidateDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_DATE_KIND = 'validate-date' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function validateDate(
  value: string | number,
  options: ValidateDateOptions = {},
): string {
  const opts: Required<ValidateDateOptions> = {
    ...VALIDATE_DATE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function validateDateMany(
  values: ReadonlyArray<string | number>,
  options: ValidateDateOptions = {},
): string[] {
  return values.map((value) => validateDate(value, options));
}

export function isValidateDateValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validateDateProduct(
  product: Product,
  options?: ValidateDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateDate(label, options);
}

export function compareValidateDate(
  a: string | number,
  b: string | number,
): number {
  const left = validateDate(a);
  const right = validateDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateDate(
  values: ReadonlyArray<string | number>,
): ValidateDateSummary {
  const formatted = validateDateMany(values);
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

export function validateDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
