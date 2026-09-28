import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './validate-name-helpers';

export interface ValidateNameOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateNameSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_NAME_DEFAULTS: Required<ValidateNameOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_NAME_KIND = 'validate-name' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function validateName(
  value: string | number,
  options: ValidateNameOptions = {},
): string {
  const opts: Required<ValidateNameOptions> = {
    ...VALIDATE_NAME_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function validateNameMany(
  values: ReadonlyArray<string | number>,
  options: ValidateNameOptions = {},
): string[] {
  return values.map((value) => validateName(value, options));
}

export function isValidateNameValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validateNameProduct(
  product: Product,
  options?: ValidateNameOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateName(label, options);
}

export function compareValidateName(
  a: string | number,
  b: string | number,
): number {
  const left = validateName(a);
  const right = validateName(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateName(
  values: ReadonlyArray<string | number>,
): ValidateNameSummary {
  const formatted = validateNameMany(values);
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

export function validateNameKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateName(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
