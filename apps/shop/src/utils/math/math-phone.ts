import type { Product } from '../../models/product.model';
import { validateCode } from '../validate/validate-code';
import {
  clampLength,
  hashString,
  normalizeInput,
  reverseText,
} from './math-phone-helpers';

export interface MathPhoneOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface MathPhoneSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const MATH_PHONE_DEFAULTS: Required<MathPhoneOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const MATH_PHONE_KIND = 'math-phone' as const;

/**
 * Formats a raw value using the "reverse" strategy.
 */
export function mathPhone(
  value: string | number,
  options: MathPhoneOptions = {},
): string {
  const opts: Required<MathPhoneOptions> = {
    ...MATH_PHONE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validateCode].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = reverseText(staged);
  return clampLength(transformed, opts.maxLength);
}

export function mathPhoneMany(
  values: ReadonlyArray<string | number>,
  options: MathPhoneOptions = {},
): string[] {
  return values.map((value) => mathPhone(value, options));
}

export function isMathPhoneValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function mathPhoneProduct(
  product: Product,
  options?: MathPhoneOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return mathPhone(label, options);
}

export function compareMathPhone(
  a: string | number,
  b: string | number,
): number {
  const left = mathPhone(a);
  const right = mathPhone(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeMathPhone(
  values: ReadonlyArray<string | number>,
): MathPhoneSummary {
  const formatted = mathPhoneMany(values);
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

export function mathPhoneKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = mathPhone(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
