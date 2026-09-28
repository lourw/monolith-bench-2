import { describe, expect, it } from 'vitest';
import {
  I18N_ADDRESS_DEFAULTS,
  I18N_ADDRESS_KIND,
  compareI18nAddress,
  i18nAddress,
  i18nAddressKeyed,
  i18nAddressMany,
  i18nAddressProduct,
  isI18nAddressValid,
  summarizeI18nAddress,
} from './i18n-address';
import { chunk, clampLength, hashString } from './i18n-address-helpers';

describe('util-i18n-address', () => {
  it('exposes its kind', () => {
    expect(I18N_ADDRESS_KIND).toBe('i18n-address');
  });

  it('returns the fallback for empty input', () => {
    expect(i18nAddress('')).toBe(I18N_ADDRESS_DEFAULTS.fallback);
    expect(i18nAddress('   ')).toBe(I18N_ADDRESS_DEFAULTS.fallback);
    expect(i18nAddress('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = i18nAddress('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(i18nAddress('same input')).toBe(i18nAddress('same input'));
    expect(compareI18nAddress('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(i18nAddressMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isI18nAddressValid('value')).toBe(true);
    expect(isI18nAddressValid(12)).toBe(true);
    expect(isI18nAddressValid('')).toBe(false);
    expect(isI18nAddressValid(Number.NaN)).toBe(false);
    expect(isI18nAddressValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = i18nAddressProduct({
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
    const summary = summarizeI18nAddress(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = i18nAddressKeyed(
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
