import { describe, expect, it } from 'vitest';
import {
  MATH_SLUG_DEFAULTS,
  MATH_SLUG_KIND,
  compareMathSlug,
  mathSlug,
  mathSlugKeyed,
  mathSlugMany,
  mathSlugProduct,
  isMathSlugValid,
  summarizeMathSlug,
} from './math-slug';
import { chunk, clampLength, hashString } from './math-slug-helpers';

describe('util-math-slug', () => {
  it('exposes its kind', () => {
    expect(MATH_SLUG_KIND).toBe('math-slug');
  });

  it('returns the fallback for empty input', () => {
    expect(mathSlug('')).toBe(MATH_SLUG_DEFAULTS.fallback);
    expect(mathSlug('   ')).toBe(MATH_SLUG_DEFAULTS.fallback);
    expect(mathSlug('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathSlug('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathSlug('same input')).toBe(mathSlug('same input'));
    expect(compareMathSlug('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathSlugMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathSlugValid('value')).toBe(true);
    expect(isMathSlugValid(12)).toBe(true);
    expect(isMathSlugValid('')).toBe(false);
    expect(isMathSlugValid(Number.NaN)).toBe(false);
    expect(isMathSlugValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathSlugProduct({
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
    const summary = summarizeMathSlug(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathSlugKeyed(
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
