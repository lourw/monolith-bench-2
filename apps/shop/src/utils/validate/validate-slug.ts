import type { Product } from '../../models/product.model';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './validate-slug-helpers';

export interface ValidateSlugOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ValidateSlugSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const VALIDATE_SLUG_DEFAULTS: Required<ValidateSlugOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const VALIDATE_SLUG_KIND = 'validate-slug' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function validateSlug(
  value: string | number,
  options: ValidateSlugOptions = {},
): string {
  const opts: Required<ValidateSlugOptions> = {
    ...VALIDATE_SLUG_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = normalized;
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function validateSlugMany(
  values: ReadonlyArray<string | number>,
  options: ValidateSlugOptions = {},
): string[] {
  return values.map((value) => validateSlug(value, options));
}

export function isValidateSlugValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function validateSlugProduct(
  product: Product,
  options?: ValidateSlugOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return validateSlug(label, options);
}

export function compareValidateSlug(
  a: string | number,
  b: string | number,
): number {
  const left = validateSlug(a);
  const right = validateSlug(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeValidateSlug(
  values: ReadonlyArray<string | number>,
): ValidateSlugSummary {
  const formatted = validateSlugMany(values);
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

export function validateSlugKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = validateSlug(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
