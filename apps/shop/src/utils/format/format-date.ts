import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './format-date-helpers';

export interface FormatDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_DATE_DEFAULTS: Required<FormatDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_DATE_KIND = 'format-date' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function formatDate(
  value: string | number,
  options: FormatDateOptions = {},
): string {
  const opts: Required<FormatDateOptions> = {
    ...FORMAT_DATE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatDateMany(
  values: ReadonlyArray<string | number>,
  options: FormatDateOptions = {},
): string[] {
  return values.map((value) => formatDate(value, options));
}

export function isFormatDateValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatDateProduct(
  product: Product,
  options?: FormatDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatDate(label, options);
}

export function compareFormatDate(
  a: string | number,
  b: string | number,
): number {
  const left = formatDate(a);
  const right = formatDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatDate(
  values: ReadonlyArray<string | number>,
): FormatDateSummary {
  const formatted = formatDateMany(values);
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

export function formatDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
