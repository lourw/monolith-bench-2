import { describe, expect, it } from 'vitest';
import {
  FORMAT_ADDRESS_DEFAULTS,
  FORMAT_ADDRESS_KIND,
  compareFormatAddress,
  formatAddress,
  formatAddressKeyed,
  formatAddressMany,
  formatAddressProduct,
  isFormatAddressValid,
  summarizeFormatAddress,
} from './format-address';
import { chunk, clampLength, hashString } from './format-address-helpers';

describe('util-format-address', () => {
  it('exposes its kind', () => {
    expect(FORMAT_ADDRESS_KIND).toBe('format-address');
  });

  it('returns the fallback for empty input', () => {
    expect(formatAddress('')).toBe(FORMAT_ADDRESS_DEFAULTS.fallback);
    expect(formatAddress('   ')).toBe(FORMAT_ADDRESS_DEFAULTS.fallback);
    expect(formatAddress('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatAddress('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatAddress('same input')).toBe(formatAddress('same input'));
    expect(compareFormatAddress('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatAddressMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatAddressValid('value')).toBe(true);
    expect(isFormatAddressValid(12)).toBe(true);
    expect(isFormatAddressValid('')).toBe(false);
    expect(isFormatAddressValid(Number.NaN)).toBe(false);
    expect(isFormatAddressValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatAddressProduct({
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
    const summary = summarizeFormatAddress(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatAddressKeyed(
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
