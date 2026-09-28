import { describe, expect, it } from 'vitest';
import {
  VALIDATE_NUMBER_DEFAULTS,
  VALIDATE_NUMBER_KIND,
  compareValidateNumber,
  validateNumber,
  validateNumberKeyed,
  validateNumberMany,
  validateNumberProduct,
  isValidateNumberValid,
  summarizeValidateNumber,
} from './validate-number';
import { chunk, clampLength, hashString } from './validate-number-helpers';

describe('util-validate-number', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_NUMBER_KIND).toBe('validate-number');
  });

  it('returns the fallback for empty input', () => {
    expect(validateNumber('')).toBe(VALIDATE_NUMBER_DEFAULTS.fallback);
    expect(validateNumber('   ')).toBe(VALIDATE_NUMBER_DEFAULTS.fallback);
    expect(validateNumber('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateNumber('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateNumber('same input')).toBe(validateNumber('same input'));
    expect(compareValidateNumber('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateNumberMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateNumberValid('value')).toBe(true);
    expect(isValidateNumberValid(12)).toBe(true);
    expect(isValidateNumberValid('')).toBe(false);
    expect(isValidateNumberValid(Number.NaN)).toBe(false);
    expect(isValidateNumberValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateNumberProduct({
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
    const summary = summarizeValidateNumber(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateNumberKeyed(
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
