import type { Product } from '../../models/product.model';
import { formatAddress } from '../format/format-address';
import {
  clampLength,
  hashString,
  normalizeInput,
  onlyDigits,
} from './math-date-helpers';

export interface MathDateOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathDateSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_DATE_DEFAULTS: Required<MathDateOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_DATE_KIND = 'math-date' as const;

/**
 * Formats a raw value using the "digits" strategy.
 */
export function mathDate(
  value: string | number,
  options: MathDateOptions = {},
): string {
  const opts: Required<MathDateOptions> = { ...MATH_DATE_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatAddress].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = onlyDigits(staged) || staged;
  return clampLength(transformed, opts.maxLength);
}

export function mathDateMany(
  values: ReadonlyArray<string | number>,
  options: MathDateOptions = {},
): string[] {
  return values.map((value) => mathDate(value, options));
}

export function isMathDateValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathDateProduct(
  product: Product,
  options?: MathDateOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathDate(label, options);
}

export function compareMathDate(
  a: string | number,
  b: string | number,
): number {
  const left = mathDate(a);
  const right = mathDate(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathDate(
  values: ReadonlyArray<string | number>,
): MathDateSummary {
  const formatted = mathDateMany(values);
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

export function mathDateKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathDate(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
