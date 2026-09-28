import type { Product } from '../../models/product.model';
import { clampLength, hashString, normalizeInput } from './i18n-date-helpers';

export interface I18nDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_DATE_DEFAULTS: Required<I18nDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_DATE_KIND = 'i18n-date' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function i18nDate(
  value: string | number,
  options: I18nDateOptions = {},
): string {
  const opts: Required<I18nDateOptions> = { ...I18N_DATE_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function i18nDateMany(
  values: ReadonlyArray<string | number>,
  options: I18nDateOptions = {},
): string[] {
  return values.map((value) => i18nDate(value, options));
}

export function isI18nDateValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nDateProduct(
  product: Product,
  options?: I18nDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nDate(label, options);
}

export function compareI18nDate(
  a: string | number,
  b: string | number,
): number {
  const left = i18nDate(a);
  const right = i18nDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nDate(
  values: ReadonlyArray<string | number>,
): I18nDateSummary {
  const formatted = i18nDateMany(values);
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

export function i18nDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
