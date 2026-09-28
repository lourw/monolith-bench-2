import type { Product } from '../../models/product.model';
import { validatePercent } from './validate-percent';
import {
  clampLength,
  hashString,
  normalizeInput,
} from './validate-text-helpers';

export interface ValidateTextOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateTextSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_TEXT_DEFAULTS: Required<ValidateTextOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_TEXT_KIND = 'validate-text' as const;

/**
 * Formats a raw value using the "prefixed" strategy.
 */
export function validateText(
  value: string | number,
  options: ValidateTextOptions = {},
): string {
  const opts: Required<ValidateTextOptions> = {
    ...VALIDATE_TEXT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [validatePercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = '#' + staged;
  return clampLength(transformed, opts.maxLength);
}

export function validateTextMany(
  values: ReadonlyArray<string | number>,
  options: ValidateTextOptions = {},
): string[] {
  return values.map((value) => validateText(value, options));
}

export function isValidateTextValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validateTextProduct(
  product: Product,
  options?: ValidateTextOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateText(label, options);
}

export function compareValidateText(
  a: string | number,
  b: string | number,
): number {
  const left = validateText(a);
  const right = validateText(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateText(
  values: ReadonlyArray<string | number>,
): ValidateTextSummary {
  const formatted = validateTextMany(values);
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

export function validateTextKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateText(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
