import type { Product } from '../../models/product.model';
import { formatPhone } from '../format/format-phone';
import { formatAddress } from '../format/format-address';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './validate-percent-helpers';

export interface ValidatePercentOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidatePercentSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_PERCENT_DEFAULTS: Required<ValidatePercentOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_PERCENT_KIND = 'validate-percent' as const;

/**
 * Formats a raw value using the "lower" strategy.
 */
export function validatePercent(
  value: string | number,
  options: ValidatePercentOptions = {},
): string {
  const opts: Required<ValidatePercentOptions> = {
    ...VALIDATE_PERCENT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatPhone, formatAddress].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toLowerCase();
  return clampLength(transformed, opts.maxLength);
}

export function validatePercentMany(
  values: ReadonlyArray<string | number>,
  options: ValidatePercentOptions = {},
): string[] {
  return values.map((value) => validatePercent(value, options));
}

export function isValidatePercentValid(
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

export function validatePercentProduct(
  product: Product,
  options?: ValidatePercentOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validatePercent(label, options);
}

export function compareValidatePercent(
  a: string | number,
  b: string | number,
): number {
  const left = validatePercent(a);
  const right = validatePercent(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidatePercent(
  values: ReadonlyArray<string | number>,
): ValidatePercentSummary {
  const formatted = validatePercentMany(values);
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

export function validatePercentKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validatePercent(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
