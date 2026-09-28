import type { Product } from '../../models/product.model';
import { clampLength, hashString, normalizeInput } from './math-text-helpers';

export interface MathTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_TEXT_DEFAULTS: Required<MathTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_TEXT_KIND = 'math-text' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function mathText(
  value: string | number,
  options: MathTextOptions = {},
): string {
  const opts: Required<MathTextOptions> = { ...MATH_TEXT_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function mathTextMany(
  values: ReadonlyArray<string | number>,
  options: MathTextOptions = {},
): string[] {
  return values.map((value) => mathText(value, options));
}

export function isMathTextValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathTextProduct(
  product: Product,
  options?: MathTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathText(label, options);
}

export function compareMathText(
  a: string | number,
  b: string | number,
): number {
  const left = mathText(a);
  const right = mathText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathText(
  values: ReadonlyArray<string | number>,
): MathTextSummary {
  const formatted = mathTextMany(values);
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

export function mathTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
