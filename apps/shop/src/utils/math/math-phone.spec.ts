import { describe, expect, it } from 'vitest';
import {
  MATH_PHONE_DEFAULTS,
  MATH_PHONE_KIND,
  compareMathPhone,
  mathPhone,
  mathPhoneKeyed,
  mathPhoneMany,
  mathPhoneProduct,
  isMathPhoneValid,
  summarizeMathPhone,
} from './math-phone';
import { chunk, clampLength, hashString } from './math-phone-helpers';

describe('util-math-phone', () => {
  it('exposes its kind', () => {
    expect(MATH_PHONE_KIND).toBe('math-phone');
  });

  it('returns the fallback for empty input', () => {
    expect(mathPhone('')).toBe(MATH_PHONE_DEFAULTS.fallback);
    expect(mathPhone('   ')).toBe(MATH_PHONE_DEFAULTS.fallback);
    expect(mathPhone('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = mathPhone('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(mathPhone('same input')).toBe(mathPhone('same input'));
    expect(compareMathPhone('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(mathPhoneMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isMathPhoneValid('value')).toBe(true);
    expect(isMathPhoneValid(12)).toBe(true);
    expect(isMathPhoneValid('')).toBe(false);
    expect(isMathPhoneValid(Number.NaN)).toBe(false);
    expect(isMathPhoneValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = mathPhoneProduct({
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
    const summary = summarizeMathPhone(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = mathPhoneKeyed(
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
