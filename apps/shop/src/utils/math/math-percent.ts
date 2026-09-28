import type { Product } from '../../models/product.model';
import { validateText } from '../validate/validate-text';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './math-percent-helpers';

export interface MathPercentOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathPercentSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_PERCENT_DEFAULTS: Required<MathPercentOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_PERCENT_KIND = 'math-percent' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function mathPercent(
  value: string | number,
  options: MathPercentOptions = {},
): string {
  const opts: Required<MathPercentOptions> = {
    ...MATH_PERCENT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateText].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function mathPercentMany(
  values: ReadonlyArray<string | number>,
  options: MathPercentOptions = {},
): string[] {
  return values.map((value) => mathPercent(value, options));
}

export function isMathPercentValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathPercentProduct(
  product: Product,
  options?: MathPercentOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathPercent(label, options);
}

export function compareMathPercent(
  a: string | number,
  b: string | number,
): number {
  const left = mathPercent(a);
  const right = mathPercent(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathPercent(
  values: ReadonlyArray<string | number>,
): MathPercentSummary {
  const formatted = mathPercentMany(values);
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

export function mathPercentKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathPercent(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
