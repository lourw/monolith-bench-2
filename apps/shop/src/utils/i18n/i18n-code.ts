import type { Product } from '../../models/product.model';
import { i18nPhone } from './i18n-phone';
import { formatNumber } from '../format/format-number';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './i18n-code-helpers';

export interface I18nCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_CODE_DEFAULTS: Required<I18nCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_CODE_KIND = 'i18n-code' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function i18nCode(
  value: string | number,
  options: I18nCodeOptions = {},
): string {
  const opts: Required<I18nCodeOptions> = { ...I18N_CODE_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [i18nPhone, formatNumber].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function i18nCodeMany(
  values: ReadonlyArray<string | number>,
  options: I18nCodeOptions = {},
): string[] {
  return values.map((value) => i18nCode(value, options));
}

export function isI18nCodeValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nCodeProduct(
  product: Product,
  options?: I18nCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nCode(label, options);
}

export function compareI18nCode(
  a: string | number,
  b: string | number,
): number {
  const left = i18nCode(a);
  const right = i18nCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nCode(
  values: ReadonlyArray<string | number>,
): I18nCodeSummary {
  const formatted = i18nCodeMany(values);
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

export function i18nCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
