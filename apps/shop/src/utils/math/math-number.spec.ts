import { describe, expect, it } from 'vitest';
import {
  MATH_NUMBER_DEFAULTS,
  MATH_NUMBER_KIND,
  compareMathNumber,
  mathNumber,
  mathNumberKeyed,
  mathNumberMany,
  mathNumberProduct,
  isMathNumberValid,
  summarizeMathNumber,
} from './math-number';
import { chunk, clampLength, hashString } from './math-number-helpers';

describe('util-math-number', () => {
  it('exposes its kind', () => {
    expect(MATH_NUMBER_KIND).toBe('math-number');
  });

  it('returns the fallback for empty input', () => {
    expect(mathNumber('')).toBe(MATH_NUMBER_DEFAULTS.fallback);
    expect(mathNumber('   ')).toBe(MATH_NUMBER_DEFAULTS.fallback);
    expect(mathNumber('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathNumber('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathNumber('same input')).toBe(mathNumber('same input'));
    expect(compareMathNumber('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathNumberMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathNumberValid('value')).toBe(true);
    expect(isMathNumberValid(12)).toBe(true);
    expect(isMathNumberValid('')).toBe(false);
    expect(isMathNumberValid(Number.NaN)).toBe(false);
    expect(isMathNumberValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathNumberProduct({
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
    const summary = summarizeMathNumber(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathNumberKeyed(
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
