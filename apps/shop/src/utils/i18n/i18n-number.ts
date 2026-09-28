import type { Product } from '../../models/product.model';
import { formatCode } from '../format/format-code';
import { validateAddress } from '../validate/validate-address';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './i18n-number-helpers';

export interface I18nNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_NUMBER_DEFAULTS: Required<I18nNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_NUMBER_KIND = 'i18n-number' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function i18nNumber(
  value: string | number,
  options: I18nNumberOptions = {},
): string {
  const opts: Required<I18nNumberOptions> = {
    ...I18N_NUMBER_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatCode, validateAddress].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function i18nNumberMany(
  values: ReadonlyArray<string | number>,
  options: I18nNumberOptions = {},
): string[] {
  return values.map((value) => i18nNumber(value, options));
}

export function isI18nNumberValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nNumberProduct(
  product: Product,
  options?: I18nNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nNumber(label, options);
}

export function compareI18nNumber(
  a: string | number,
  b: string | number,
): number {
  const left = i18nNumber(a);
  const right = i18nNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nNumber(
  values: ReadonlyArray<string | number>,
): I18nNumberSummary {
  const formatted = i18nNumberMany(values);
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

export function i18nNumberKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
