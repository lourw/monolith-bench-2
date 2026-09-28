import type { Product } from '../../models/product.model';
import { clampLength, hashString, normalizeInput } from './math-slug-helpers';

export interface MathSlugOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathSlugSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_SLUG_DEFAULTS: Required<MathSlugOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_SLUG_KIND = 'math-slug' as const;

/**
 * Formats a raw value using the "lower" strategy.
 */
export function mathSlug(
  value: string | number,
  options: MathSlugOptions = {},
): string {
  const opts: Required<MathSlugOptions> = { ...MATH_SLUG_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = staged.toLowerCase();
  return clampLength(transformed, opts.maxLength);
}

export function mathSlugMany(
  values: ReadonlyArray<string | number>,
  options: MathSlugOptions = {},
): string[] {
  return values.map((value) => mathSlug(value, options));
}

export function isMathSlugValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathSlugProduct(
  product: Product,
  options?: MathSlugOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathSlug(label, options);
}

export function compareMathSlug(
  a: string | number,
  b: string | number,
): number {
  const left = mathSlug(a);
  const right = mathSlug(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathSlug(
  values: ReadonlyArray<string | number>,
): MathSlugSummary {
  const formatted = mathSlugMany(values);
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

export function mathSlugKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathSlug(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
