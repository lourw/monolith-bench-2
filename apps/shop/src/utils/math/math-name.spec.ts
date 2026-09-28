import { describe, expect, it } from 'vitest';
import {
  MATH_NAME_DEFAULTS,
  MATH_NAME_KIND,
  compareMathName,
  mathName,
  mathNameKeyed,
  mathNameMany,
  mathNameProduct,
  isMathNameValid,
  summarizeMathName,
} from './math-name';
import { chunk, clampLength, hashString } from './math-name-helpers';

describe('util-math-name', () => {
  it('exposes its kind', () => {
    expect(MATH_NAME_KIND).toBe('math-name');
  });

  it('returns the fallback for empty input', () => {
    expect(mathName('')).toBe(MATH_NAME_DEFAULTS.fallback);
    expect(mathName('   ')).toBe(MATH_NAME_DEFAULTS.fallback);
    expect(mathName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathName('same input')).toBe(mathName('same input'));
    expect(compareMathName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathNameValid('value')).toBe(true);
    expect(isMathNameValid(12)).toBe(true);
    expect(isMathNameValid('')).toBe(false);
    expect(isMathNameValid(Number.NaN)).toBe(false);
    expect(isMathNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathNameProduct({
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
    const summary = summarizeMathName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathNameKeyed(
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
