import type { Product } from '../../models/product.model';
import { formatPhone } from '../format/format-phone';
import { validateSlug } from '../validate/validate-slug';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './async-percent-helpers';

export interface AsyncPercentOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface AsyncPercentSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ASYNC_PERCENT_DEFAULTS: Required<AsyncPercentOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ASYNC_PERCENT_KIND = 'async-percent' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function asyncPercent(
  value: string | number,
  options: AsyncPercentOptions = {},
): string {
  const opts: Required<AsyncPercentOptions> = {
    ...ASYNC_PERCENT_DEFAULTS,
    ...options,
  };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [formatPhone, validateSlug].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function asyncPercentMany(
  values: ReadonlyArray<string | number>,
  options: AsyncPercentOptions = {},
): string[] {
  return values.map((value) => asyncPercent(value, options));
}

export function isAsyncPercentValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function asyncPercentProduct(
  product: Product,
  options?: AsyncPercentOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return asyncPercent(label, options);
}

export function compareAsyncPercent(
  a: string | number,
  b: string | number,
): number {
  const left = asyncPercent(a);
  const right = asyncPercent(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeAsyncPercent(
  values: ReadonlyArray<string | number>,
): AsyncPercentSummary {
  const formatted = asyncPercentMany(values);
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

export function asyncPercentKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = asyncPercent(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
