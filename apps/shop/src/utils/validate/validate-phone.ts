import type { Product } from '../../models/product.model';
import { formatName } from '../format/format-name';
import { formatDate } from '../format/format-date';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './validate-phone-helpers';

export interface ValidatePhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidatePhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_PHONE_DEFAULTS: Required<ValidatePhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_PHONE_KIND = 'validate-phone' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function validatePhone(
  value: string | number,
  options: ValidatePhoneOptions = {},
): string {
  const opts: Required<ValidatePhoneOptions> = {
    ...VALIDATE_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatName, formatDate].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function validatePhoneMany(
  values: ReadonlyArray<string | number>,
  options: ValidatePhoneOptions = {},
): string[] {
  return values.map((value) => validatePhone(value, options));
}

export function isValidatePhoneValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validatePhoneProduct(
  product: Product,
  options?: ValidatePhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validatePhone(label, options);
}

export function compareValidatePhone(
  a: string | number,
  b: string | number,
): number {
  const left = validatePhone(a);
  const right = validatePhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidatePhone(
  values: ReadonlyArray<string | number>,
): ValidatePhoneSummary {
  const formatted = validatePhoneMany(values);
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

export function validatePhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validatePhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
