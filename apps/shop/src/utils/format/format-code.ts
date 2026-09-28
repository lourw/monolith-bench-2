import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './format-code-helpers';

export interface FormatCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_CODE_DEFAULTS: Required<FormatCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_CODE_KIND = 'format-code' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function formatCode(
  value: string | number,
  options: FormatCodeOptions = {},
): string {
  const opts: Required<FormatCodeOptions> = {
    ...FORMAT_CODE_DEFAULTS,
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

export function formatCodeMany(
  values: ReadonlyArray<string | number>,
  options: FormatCodeOptions = {},
): string[] {
  return values.map((value) => formatCode(value, options));
}

export function isFormatCodeValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatCodeProduct(
  product: Product,
  options?: FormatCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatCode(label, options);
}

export function compareFormatCode(
  a: string | number,
  b: string | number,
): number {
  const left = formatCode(a);
  const right = formatCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatCode(
  values: ReadonlyArray<string | number>,
): FormatCodeSummary {
  const formatted = formatCodeMany(values);
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

export function formatCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
