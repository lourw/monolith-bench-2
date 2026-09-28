import { describe, expect, it } from 'vitest';
import {
  FORMAT_SLUG_DEFAULTS,
  FORMAT_SLUG_KIND,
  compareFormatSlug,
  formatSlug,
  formatSlugKeyed,
  formatSlugMany,
  formatSlugProduct,
  isFormatSlugValid,
  summarizeFormatSlug,
} from './format-slug';
import { chunk, clampLength, hashString } from './format-slug-helpers';

describe('util-format-slug', () => {
  it('exposes its kind', () => {
    expect(FORMAT_SLUG_KIND).toBe('format-slug');
  });

  it('returns the fallback for empty input', () => {
    expect(formatSlug('')).toBe(FORMAT_SLUG_DEFAULTS.fallback);
    expect(formatSlug('   ')).toBe(FORMAT_SLUG_DEFAULTS.fallback);
    expect(formatSlug('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatSlug('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatSlug('same input')).toBe(formatSlug('same input'));
    expect(compareFormatSlug('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatSlugMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatSlugValid('value')).toBe(true);
    expect(isFormatSlugValid(12)).toBe(true);
    expect(isFormatSlugValid('')).toBe(false);
    expect(isFormatSlugValid(Number.NaN)).toBe(false);
    expect(isFormatSlugValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatSlugProduct({
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
    const summary = summarizeFormatSlug(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatSlugKeyed(
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
