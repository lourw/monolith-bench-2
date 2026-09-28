import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './format-number-helpers';

export interface FormatNumberOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatNumberSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_NUMBER_DEFAULTS: Required<FormatNumberOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_NUMBER_KIND = 'format-number' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function formatNumber(
  value: string | number,
  options: FormatNumberOptions = {},
): string {
  const opts: Required<FormatNumberOptions> = {
    ...FORMAT_NUMBER_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatNumberMany(
  values: ReadonlyArray<string | number>,
  options: FormatNumberOptions = {},
): string[] {
  return values.map((value) => formatNumber(value, options));
}

export function isFormatNumberValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatNumberProduct(
  product: Product,
  options?: FormatNumberOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatNumber(label, options);
}

export function compareFormatNumber(
  a: string | number,
  b: string | number,
): number {
  const left = formatNumber(a);
  const right = formatNumber(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatNumber(
  values: ReadonlyArray<string | number>,
): FormatNumberSummary {
  const formatted = formatNumberMany(values);
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

export function formatNumberKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatNumber(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
