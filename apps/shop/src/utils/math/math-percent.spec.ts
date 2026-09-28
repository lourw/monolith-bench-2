import { describe, expect, it } from 'vitest';
import {
  MATH_PERCENT_DEFAULTS,
  MATH_PERCENT_KIND,
  compareMathPercent,
  mathPercent,
  mathPercentKeyed,
  mathPercentMany,
  mathPercentProduct,
  isMathPercentValid,
  summarizeMathPercent,
} from './math-percent';
import { chunk, clampLength, hashString } from './math-percent-helpers';

describe('util-math-percent', () => {
  it('exposes its kind', () => {
    expect(MATH_PERCENT_KIND).toBe('math-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(mathPercent('')).toBe(MATH_PERCENT_DEFAULTS.fallback);
    expect(mathPercent('   ')).toBe(MATH_PERCENT_DEFAULTS.fallback);
    expect(mathPercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathPercent('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathPercent('same input')).toBe(mathPercent('same input'));
    expect(compareMathPercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathPercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathPercentValid('value')).toBe(true);
    expect(isMathPercentValid(12)).toBe(true);
    expect(isMathPercentValid('')).toBe(false);
    expect(isMathPercentValid(Number.NaN)).toBe(false);
    expect(isMathPercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathPercentProduct({
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
    const summary = summarizeMathPercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathPercentKeyed(
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
