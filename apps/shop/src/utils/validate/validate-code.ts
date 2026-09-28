import type { Product } from '../../models/product.model';
import { formatName } from '../format/format-name';
import { formatPercent } from '../format/format-percent';
import {
  clampLength,
  hashString,
  normalizeInput,
  padCode,
} from './validate-code-helpers';

export interface ValidateCodeOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateCodeSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_CODE_DEFAULTS: Required<ValidateCodeOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_CODE_KIND = 'validate-code' as const;

/**
 * Formats a raw value using the "padded" strategy.
 */
export function validateCode(
  value: string | number,
  options: ValidateCodeOptions = {},
): string {
  const opts: Required<ValidateCodeOptions> = {
    ...VALIDATE_CODE_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatName, formatPercent].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = padCode(staged, 4);
  return clampLength(transformed, opts.maxLength);
}

export function validateCodeMany(
  values: ReadonlyArray<string | number>,
  options: ValidateCodeOptions = {},
): string[] {
  return values.map((value) => validateCode(value, options));
}

export function isValidateCodeValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validateCodeProduct(
  product: Product,
  options?: ValidateCodeOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateCode(label, options);
}

export function compareValidateCode(
  a: string | number,
  b: string | number,
): number {
  const left = validateCode(a);
  const right = validateCode(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateCode(
  values: ReadonlyArray<string | number>,
): ValidateCodeSummary {
  const formatted = validateCodeMany(values);
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

export function validateCodeKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateCode(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
