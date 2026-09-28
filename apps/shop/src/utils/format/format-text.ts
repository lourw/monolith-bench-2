import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './format-text-helpers';

export interface FormatTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_TEXT_DEFAULTS: Required<FormatTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_TEXT_KIND = 'format-text' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function formatText(
  value: string | number,
  options: FormatTextOptions = {},
): string {
  const opts: Required<FormatTextOptions> = {
    ...FORMAT_TEXT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatTextMany(
  values: ReadonlyArray<string | number>,
  options: FormatTextOptions = {},
): string[] {
  return values.map((value) => formatText(value, options));
}

export function isFormatTextValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatTextProduct(
  product: Product,
  options?: FormatTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatText(label, options);
}

export function compareFormatText(
  a: string | number,
  b: string | number,
): number {
  const left = formatText(a);
  const right = formatText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatText(
  values: ReadonlyArray<string | number>,
): FormatTextSummary {
  const formatted = formatTextMany(values);
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

export function formatTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
