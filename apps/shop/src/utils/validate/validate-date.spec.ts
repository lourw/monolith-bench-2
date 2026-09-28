import { describe, expect, it } from 'vitest';
import {
  VALIDATE_DATE_DEFAULTS,
  VALIDATE_DATE_KIND,
  compareValidateDate,
  validateDate,
  validateDateKeyed,
  validateDateMany,
  validateDateProduct,
  isValidateDateValid,
  summarizeValidateDate,
} from './validate-date';
import { chunk, clampLength, hashString } from './validate-date-helpers';

describe('util-validate-date', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_DATE_KIND).toBe('validate-date');
  });

  it('returns the fallback for empty input', () => {
    expect(validateDate('')).toBe(VALIDATE_DATE_DEFAULTS.fallback);
    expect(validateDate('   ')).toBe(VALIDATE_DATE_DEFAULTS.fallback);
    expect(validateDate('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateDate('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateDate('same input')).toBe(validateDate('same input'));
    expect(compareValidateDate('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateDateMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateDateValid('value')).toBe(true);
    expect(isValidateDateValid(12)).toBe(true);
    expect(isValidateDateValid('')).toBe(false);
    expect(isValidateDateValid(Number.NaN)).toBe(false);
    expect(isValidateDateValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateDateProduct({
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
    const summary = summarizeValidateDate(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateDateKeyed(
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
