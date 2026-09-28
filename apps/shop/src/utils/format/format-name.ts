import type { Product } from '../../models/product.model';
import { formatText } from './format-text';
import { formatPercent } from './format-percent';
import {
  clampLength,
  hashString,
  normalizeInput,
  titleCase,
} from './format-name-helpers';

export interface FormatNameOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatNameSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_NAME_DEFAULTS: Required<FormatNameOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_NAME_KIND = 'format-name' as const;

/**
 * Formats a raw value using the "title" strategy.
 */
export function formatName(
  value: string | number,
  options: FormatNameOptions = {},
): string {
  const opts: Required<FormatNameOptions> = {
    ...FORMAT_NAME_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatText, formatPercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = titleCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function formatNameMany(
  values: ReadonlyArray<string | number>,
  options: FormatNameOptions = {},
): string[] {
  return values.map((value) => formatName(value, options));
}

export function isFormatNameValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatNameProduct(
  product: Product,
  options?: FormatNameOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatName(label, options);
}

export function compareFormatName(
  a: string | number,
  b: string | number,
): number {
  const left = formatName(a);
  const right = formatName(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatName(
  values: ReadonlyArray<string | number>,
): FormatNameSummary {
  const formatted = formatNameMany(values);
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

export function formatNameKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatName(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
