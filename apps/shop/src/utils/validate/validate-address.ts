import type { Product } from '../../models/product.model';
import { formatNumber } from '../format/format-number';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './validate-address-helpers';

export interface ValidateAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_ADDRESS_DEFAULTS: Required<ValidateAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_ADDRESS_KIND = 'validate-address' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function validateAddress(
  value: string | number,
  options: ValidateAddressOptions = {},
): string {
  const opts: Required<ValidateAddressOptions> = {
    ...VALIDATE_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatNumber].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function validateAddressMany(
  values: ReadonlyArray<string | number>,
  options: ValidateAddressOptions = {},
): string[] {
  return values.map((value) => validateAddress(value, options));
}

export function isValidateAddressValid(
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

export function validateAddressProduct(
  product: Product,
  options?: ValidateAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateAddress(label, options);
}

export function compareValidateAddress(
  a: string | number,
  b: string | number,
): number {
  const left = validateAddress(a);
  const right = validateAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateAddress(
  values: ReadonlyArray<string | number>,
): ValidateAddressSummary {
  const formatted = validateAddressMany(values);
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

export function validateAddressKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
