import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './i18n-address-helpers';

export interface I18nAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_ADDRESS_DEFAULTS: Required<I18nAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_ADDRESS_KIND = 'i18n-address' as const;

/**
 * Formats a raw value using the "lower" strategy.
 */
export function i18nAddress(
  value: string | number,
  options: I18nAddressOptions = {},
): string {
  const opts: Required<I18nAddressOptions> = {
    ...I18N_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = staged.toLowerCase();
  return clampLength(transformed, opts.maxLength);
}

export function i18nAddressMany(
  values: ReadonlyArray<string | number>,
  options: I18nAddressOptions = {},
): string[] {
  return values.map((value) => i18nAddress(value, options));
}

export function isI18nAddressValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nAddressProduct(
  product: Product,
  options?: I18nAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nAddress(label, options);
}

export function compareI18nAddress(
  a: string | number,
  b: string | number,
): number {
  const left = i18nAddress(a);
  const right = i18nAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nAddress(
  values: ReadonlyArray<string | number>,
): I18nAddressSummary {
  const formatted = i18nAddressMany(values);
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

export function i18nAddressKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
