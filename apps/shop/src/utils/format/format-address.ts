import type { Product } from '../../models/product.model';
import { formatDate } from './format-date';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './format-address-helpers';

export interface FormatAddressOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface FormatAddressSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const FORMAT_ADDRESS_DEFAULTS: Required<FormatAddressOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const FORMAT_ADDRESS_KIND = 'format-address' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function formatAddress(
  value: string | number,
  options: FormatAddressOptions = {},
): string {
  const opts: Required<FormatAddressOptions> = {
    ...FORMAT_ADDRESS_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatDate].reduce<string>((acc, fn) => fn(acc), normalized);
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function formatAddressMany(
  values: ReadonlyArray<string | number>,
  options: FormatAddressOptions = {},
): string[] {
  return values.map((value) => formatAddress(value, options));
}

export function isFormatAddressValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function formatAddressProduct(
  product: Product,
  options?: FormatAddressOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return formatAddress(label, options);
}

export function compareFormatAddress(
  a: string | number,
  b: string | number,
): number {
  const left = formatAddress(a);
  const right = formatAddress(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeFormatAddress(
  values: ReadonlyArray<string | number>,
): FormatAddressSummary {
  const formatted = formatAddressMany(values);
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

export function formatAddressKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = formatAddress(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
