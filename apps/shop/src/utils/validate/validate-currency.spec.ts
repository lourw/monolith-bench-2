import { describe, expect, it } from 'vitest';
import {
  VALIDATE_CURRENCY_DEFAULTS,
  VALIDATE_CURRENCY_KIND,
  compareValidateCurrency,
  validateCurrency,
  validateCurrencyKeyed,
  validateCurrencyMany,
  validateCurrencyProduct,
  isValidateCurrencyValid,
  summarizeValidateCurrency,
} from './validate-currency';
import { chunk, clampLength, hashString } from './validate-currency-helpers';

describe('util-validate-currency', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_CURRENCY_KIND).toBe('validate-currency');
  });

  it('returns the fallback for empty input', () => {
    expect(validateCurrency('')).toBe(VALIDATE_CURRENCY_DEFAULTS.fallback);
    expect(validateCurrency('   ')).toBe(VALIDATE_CURRENCY_DEFAULTS.fallback);
    expect(validateCurrency('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validateCurrency('Wireless Headphones 42', {
      maxLength: 10,
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validateCurrency('same input')).toBe(validateCurrency('same input'));
    expect(compareValidateCurrency('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validateCurrencyMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidateCurrencyValid('value')).toBe(true);
    expect(isValidateCurrencyValid(12)).toBe(true);
    expect(isValidateCurrencyValid('')).toBe(false);
    expect(isValidateCurrencyValid(Number.NaN)).toBe(false);
    expect(isValidateCurrencyValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validateCurrencyProduct({
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
    const summary = summarizeValidateCurrency(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validateCurrencyKeyed(
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
