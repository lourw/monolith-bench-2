import { describe, expect, it } from 'vitest';
import {
  VALIDATE_PERCENT_DEFAULTS,
  VALIDATE_PERCENT_KIND,
  compareValidatePercent,
  validatePercent,
  validatePercentKeyed,
  validatePercentMany,
  validatePercentProduct,
  isValidatePercentValid,
  summarizeValidatePercent,
} from './validate-percent';
import { chunk, clampLength, hashString } from './validate-percent-helpers';

describe('util-validate-percent', () => {
  it('exposes its kind', () => {
    expect(VALIDATE_PERCENT_KIND).toBe('validate-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(validatePercent('')).toBe(VALIDATE_PERCENT_DEFAULTS.fallback);
    expect(validatePercent('   ')).toBe(VALIDATE_PERCENT_DEFAULTS.fallback);
    expect(validatePercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = validatePercent('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(validatePercent('same input')).toBe(validatePercent('same input'));
    expect(compareValidatePercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(validatePercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isValidatePercentValid('value')).toBe(true);
    expect(isValidatePercentValid(12)).toBe(true);
    expect(isValidatePercentValid('')).toBe(false);
    expect(isValidatePercentValid(Number.NaN)).toBe(false);
    expect(isValidatePercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = validatePercentProduct({
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
    const summary = summarizeValidatePercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = validatePercentKeyed(
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
