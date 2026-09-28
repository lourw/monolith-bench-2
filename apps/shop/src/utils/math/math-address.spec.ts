import { describe, expect, it } from 'vitest';
import {
  MATH_ADDRESS_DEFAULTS,
  MATH_ADDRESS_KIND,
  compareMathAddress,
  mathAddress,
  mathAddressKeyed,
  mathAddressMany,
  mathAddressProduct,
  isMathAddressValid,
  summarizeMathAddress,
} from './math-address';
import { chunk, clampLength, hashString } from './math-address-helpers';

describe('util-math-address', () => {
  it('exposes its kind', () => {
    expect(MATH_ADDRESS_KIND).toBe('math-address');
  });

  it('returns the fallback for empty input', () => {
    expect(mathAddress('')).toBe(MATH_ADDRESS_DEFAULTS.fallback);
    expect(mathAddress('   ')).toBe(MATH_ADDRESS_DEFAULTS.fallback);
    expect(mathAddress('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathAddress('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathAddress('same input')).toBe(mathAddress('same input'));
    expect(compareMathAddress('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathAddressMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathAddressValid('value')).toBe(true);
    expect(isMathAddressValid(12)).toBe(true);
    expect(isMathAddressValid('')).toBe(false);
    expect(isMathAddressValid(Number.NaN)).toBe(false);
    expect(isMathAddressValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathAddressProduct({
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
    const summary = summarizeMathAddress(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathAddressKeyed(
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
