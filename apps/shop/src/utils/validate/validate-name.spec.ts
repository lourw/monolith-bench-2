import { describe, expect, it } from 'vitest';
import {
  VALIDATE_NAME_DEFAULTS,
  VALIDATE_NAME_KIND,
  compareValidateName,
  validateName,
  validateNameKeyed,
  validateNameMany,
  validateNameProduct,
  isValidateNameValid,
  summarizeValidateName,
} from './validate-name';
import { chunk, clampLength, hashString } from './validate-name-helpers';

describe('util-validate-name', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_NAME_KIND).toBe('validate-name');
  });

  it('returns the fallback for empty input', () => {
    expect(validateName('')).toBe(VALIDATE_NAME_DEFAULTS.fallback);
    expect(validateName('   ')).toBe(VALIDATE_NAME_DEFAULTS.fallback);
    expect(validateName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateName('same input')).toBe(validateName('same input'));
    expect(compareValidateName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateNameValid('value')).toBe(true);
    expect(isValidateNameValid(12)).toBe(true);
    expect(isValidateNameValid('')).toBe(false);
    expect(isValidateNameValid(Number.NaN)).toBe(false);
    expect(isValidateNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateNameProduct({
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
    const summary = summarizeValidateName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateNameKeyed(
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
