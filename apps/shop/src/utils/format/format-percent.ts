import type { Product } from '../../models/product.model';
import { formatCurrency } from './format-currency';
import { formatNumber } from './format-number';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './format-percent-helpers';

export interface FormatPercentOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatPercentSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_PERCENT_DEFAULTS: Required<FormatPercentOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_PERCENT_KIND = 'format-percent' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function formatPercent(
  value: string | number,
  options: FormatPercentOptions = {},
): string {
  const opts: Required<FormatPercentOptions> = {
    ...FORMAT_PERCENT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatCurrency, formatNumber].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatPercentMany(
  values: ReadonlyArray<string | number>,
  options: FormatPercentOptions = {},
): string[] {
  return values.map((value) => formatPercent(value, options));
}

export function isFormatPercentValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatPercentProduct(
  product: Product,
  options?: FormatPercentOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatPercent(label, options);
}

export function compareFormatPercent(
  a: string | number,
  b: string | number,
): number {
  const left = formatPercent(a);
  const right = formatPercent(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatPercent(
  values: ReadonlyArray<string | number>,
): FormatPercentSummary {
  const formatted = formatPercentMany(values);
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

export function formatPercentKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatPercent(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
