import { describe, expect, it } from 'vitest';
import {
  VALIDATE_TEXT_DEFAULTS,
  VALIDATE_TEXT_KIND,
  compareValidateText,
  validateText,
  validateTextKeyed,
  validateTextMany,
  validateTextProduct,
  isValidateTextValid,
  summarizeValidateText,
} from './validate-text';
import { chunk, clampLength, hashString } from './validate-text-helpers';

describe('util-validate-text', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_TEXT_KIND).toBe('validate-text');
  });

  it('returns the fallback for empty input', () => {
    expect(validateText('')).toBe(VALIDATE_TEXT_DEFAULTS.fallback);
    expect(validateText('   ')).toBe(VALIDATE_TEXT_DEFAULTS.fallback);
    expect(validateText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateText('same input')).toBe(validateText('same input'));
    expect(compareValidateText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateTextValid('value')).toBe(true);
    expect(isValidateTextValid(12)).toBe(true);
    expect(isValidateTextValid('')).toBe(false);
    expect(isValidateTextValid(Number.NaN)).toBe(false);
    expect(isValidateTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateTextProduct({
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
    const summary = summarizeValidateText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateTextKeyed(
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
