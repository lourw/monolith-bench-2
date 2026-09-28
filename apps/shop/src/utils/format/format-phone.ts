import type { Product } from '../../models/product.model';
import { formatDate } from './format-date';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './format-phone-helpers';

export interface FormatPhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatPhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_PHONE_DEFAULTS: Required<FormatPhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_PHONE_KIND = 'format-phone' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function formatPhone(
  value: string | number,
  options: FormatPhoneOptions = {},
): string {
  const opts: Required<FormatPhoneOptions> = {
    ...FORMAT_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatDate].reduce<string>((acc, fn) => fn(acc), normalized);
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatPhoneMany(
  values: ReadonlyArray<string | number>,
  options: FormatPhoneOptions = {},
): string[] {
  return values.map((value) => formatPhone(value, options));
}

export function isFormatPhoneValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatPhoneProduct(
  product: Product,
  options?: FormatPhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatPhone(label, options);
}

export function compareFormatPhone(
  a: string | number,
  b: string | number,
): number {
  const left = formatPhone(a);
  const right = formatPhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatPhone(
  values: ReadonlyArray<string | number>,
): FormatPhoneSummary {
  const formatted = formatPhoneMany(values);
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

export function formatPhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatPhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
