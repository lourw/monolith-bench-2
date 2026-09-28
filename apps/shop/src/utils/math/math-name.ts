import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './math-name-helpers';

export interface MathNameOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathNameSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_NAME_DEFAULTS: Required<MathNameOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_NAME_KIND = 'math-name' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function mathName(
  value: string | number,
  options: MathNameOptions = {},
): string {
  const opts: Required<MathNameOptions> = { ...MATH_NAME_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function mathNameMany(
  values: ReadonlyArray<string | number>,
  options: MathNameOptions = {},
): string[] {
  return values.map((value) => mathName(value, options));
}

export function isMathNameValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathNameProduct(
  product: Product,
  options?: MathNameOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathName(label, options);
}

export function compareMathName(
  a: string | number,
  b: string | number,
): number {
  const left = mathName(a);
  const right = mathName(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathName(
  values: ReadonlyArray<string | number>,
): MathNameSummary {
  const formatted = mathNameMany(values);
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

export function mathNameKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathName(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
