import { describe, expect, it } from 'vitest';
import {
  ASYNC_SLUG_DEFAULTS,
  ASYNC_SLUG_KIND,
  compareAsyncSlug,
  asyncSlug,
  asyncSlugKeyed,
  asyncSlugMany,
  asyncSlugProduct,
  isAsyncSlugValid,
  summarizeAsyncSlug,
} from './async-slug';
import { chunk, clampLength, hashString } from './async-slug-helpers';

describe('util-async-slug', () => {
  it('exposes its kind', () => {
    expect(ASYNC_SLUG_KIND).toBe('async-slug');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncSlug('')).toBe(ASYNC_SLUG_DEFAULTS.fallback);
    expect(asyncSlug('   ')).toBe(ASYNC_SLUG_DEFAULTS.fallback);
    expect(asyncSlug('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncSlug('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncSlug('same input')).toBe(asyncSlug('same input'));
    expect(compareAsyncSlug('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncSlugMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncSlugValid('value')).toBe(true);
    expect(isAsyncSlugValid(12)).toBe(true);
    expect(isAsyncSlugValid('')).toBe(false);
    expect(isAsyncSlugValid(Number.NaN)).toBe(false);
    expect(isAsyncSlugValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncSlugProduct({
      id: '1',
      name: 'Desk Lamp',
      description: 'A lamp',
      price: 19.99,
      category: 'Home',
      imageUrl: '',
      inStock: true,
      rating: 4,
      reviewCount: 2,
    });
    expect(result.length).toBeGreaterThan(0);
  });

  it('summarizes values', () => {
    const summary = summarizeAsyncSlug(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncSlugKeyed(
      [
        { id: 'a', status: 'open' },
        { id: 'b', status: 'open' },
        { id: 'c', status: 'closed' },
      ],
      'status',
    );
    expect(grouped.size).toBe(2);
  });

  it('helpers behave', () => {
    expect(clampLength('abcdef', 3)).toHaveLength(3);
    expect(hashString('x')).toBe(hashString('x'));
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
