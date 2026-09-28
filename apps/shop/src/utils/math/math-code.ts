import type { Product } from '../../models/product.model';
import { validatePercent } from '../validate/validate-percent';
import { clampLength, hashString, normalizeInput } from './math-code-helpers';

export interface MathCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_CODE_DEFAULTS: Required<MathCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_CODE_KIND = 'math-code' as const;

/**
 * Formats a raw value using the "upper" strategy.
 */
export function mathCode(
  value: string | number,
  options: MathCodeOptions = {},
): string {
  const opts: Required<MathCodeOptions> = { ...MATH_CODE_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validatePercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = staged.toUpperCase();
  return clampLength(transformed, opts.maxLength);
}

export function mathCodeMany(
  values: ReadonlyArray<string | number>,
  options: MathCodeOptions = {},
): string[] {
  return values.map((value) => mathCode(value, options));
}

export function isMathCodeValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathCodeProduct(
  product: Product,
  options?: MathCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathCode(label, options);
}

export function compareMathCode(
  a: string | number,
  b: string | number,
): number {
  const left = mathCode(a);
  const right = mathCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathCode(
  values: ReadonlyArray<string | number>,
): MathCodeSummary {
  const formatted = mathCodeMany(values);
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

export function mathCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
