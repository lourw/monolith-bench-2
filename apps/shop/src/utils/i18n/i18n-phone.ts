import type { Product } from '../../models/product.model';
import { i18nCurrency } from './i18n-currency';
import { asyncAddress } from '../async/async-address';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './i18n-phone-helpers';

export interface I18nPhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nPhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_PHONE_DEFAULTS: Required<I18nPhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_PHONE_KIND = 'i18n-phone' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function i18nPhone(
  value: string | number,
  options: I18nPhoneOptions = {},
): string {
  const opts: Required<I18nPhoneOptions> = {
    ...I18N_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [i18nCurrency, asyncAddress].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function i18nPhoneMany(
  values: ReadonlyArray<string | number>,
  options: I18nPhoneOptions = {},
): string[] {
  return values.map((value) => i18nPhone(value, options));
}

export function isI18nPhoneValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nPhoneProduct(
  product: Product,
  options?: I18nPhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nPhone(label, options);
}

export function compareI18nPhone(
  a: string | number,
  b: string | number,
): number {
  const left = i18nPhone(a);
  const right = i18nPhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nPhone(
  values: ReadonlyArray<string | number>,
): I18nPhoneSummary {
  const formatted = i18nPhoneMany(values);
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

export function i18nPhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nPhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
