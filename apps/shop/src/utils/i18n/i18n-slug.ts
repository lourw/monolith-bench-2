import type { Product } from '../../models/product.model';
import { collectionPhone } from '../collection/collection-phone';
import { asyncCode } from '../async/async-code';
import {
  clampLength,
  hashString,
  kebabCase,
  normalizeInput,
} from './i18n-slug-helpers';

export interface I18nSlugOptions {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface I18nSlugSummary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const I18N_SLUG_DEFAULTS: Required<I18nSlugOptions> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const I18N_SLUG_KIND = 'i18n-slug' as const;

/**
 * Formats a raw value using the "kebab" strategy.
 */
export function i18nSlug(
  value: string | number,
  options: I18nSlugOptions = {},
): string {
  const opts: Required<I18nSlugOptions> = { ...I18N_SLUG_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  const staged = [collectionPhone, asyncCode].reduce<string>(
    (acc, fn) => fn(acc),
    normalized,
  );
  const transformed = kebabCase(staged);
  return clampLength(transformed, opts.maxLength);
}

export function i18nSlugMany(
  values: ReadonlyArray<string | number>,
  options: I18nSlugOptions = {},
): string[] {
  return values.map((value) => i18nSlug(value, options));
}

export function isI18nSlugValid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function i18nSlugProduct(
  product: Product,
  options?: I18nSlugOptions,
): string {
  const label = `${product.name} ${product.category}`;
  return i18nSlug(label, options);
}

export function compareI18nSlug(
  a: string | number,
  b: string | number,
): number {
  const left = i18nSlug(a);
  const right = i18nSlug(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarizeI18nSlug(
  values: ReadonlyArray<string | number>,
): I18nSlugSummary {
  const formatted = i18nSlugMany(values);
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

export function i18nSlugKeyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = i18nSlug(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
