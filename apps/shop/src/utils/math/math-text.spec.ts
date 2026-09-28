import { describe, expect, it } from 'vitest';
import {
  MATH_TEXT_DEFAULTS,
  MATH_TEXT_KIND,
  compareMathText,
  mathText,
  mathTextKeyed,
  mathTextMany,
  mathTextProduct,
  isMathTextValid,
  summarizeMathText,
} from './math-text';
import { chunk, clampLength, hashString } from './math-text-helpers';

describe('util-math-text', () => {
  it('exposes its kind', () => {
    expect(MATH_TEXT_KIND).toBe('math-text');
  });

  it('returns the fallback for empty input', () => {
    expect(mathText('')).toBe(MATH_TEXT_DEFAULTS.fallback);
    expect(mathText('   ')).toBe(MATH_TEXT_DEFAULTS.fallback);
    expect(mathText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathText('same input')).toBe(mathText('same input'));
    expect(compareMathText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathTextValid('value')).toBe(true);
    expect(isMathTextValid(12)).toBe(true);
    expect(isMathTextValid('')).toBe(false);
    expect(isMathTextValid(Number.NaN)).toBe(false);
    expect(isMathTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathTextProduct({
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
    const summary = summarizeMathText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathTextKeyed(
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
