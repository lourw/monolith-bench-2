import { describe, expect, it } from 'vitest';
import {
  VALIDATE_CODE_DEFAULTS,
  VALIDATE_CODE_KIND,
  compareValidateCode,
  validateCode,
  validateCodeKeyed,
  validateCodeMany,
  validateCodeProduct,
  isValidateCodeValid,
  summarizeValidateCode,
} from './validate-code';
import { chunk, clampLength, hashString } from './validate-code-helpers';

describe('util-validate-code', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_CODE_KIND).toBe('validate-code');
  });

  it('returns the fallback for empty input', () => {
    expect(validateCode('')).toBe(VALIDATE_CODE_DEFAULTS.fallback);
    expect(validateCode('   ')).toBe(VALIDATE_CODE_DEFAULTS.fallback);
    expect(validateCode('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateCode('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateCode('same input')).toBe(validateCode('same input'));
    expect(compareValidateCode('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateCodeMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateCodeValid('value')).toBe(true);
    expect(isValidateCodeValid(12)).toBe(true);
    expect(isValidateCodeValid('')).toBe(false);
    expect(isValidateCodeValid(Number.NaN)).toBe(false);
    expect(isValidateCodeValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateCodeProduct({
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
    const summary = summarizeValidateCode(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateCodeKeyed(
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
