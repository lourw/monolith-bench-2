import { describe, expect, it } from 'vitest';
import {
  FORMAT_PHONE_DEFAULTS,
  FORMAT_PHONE_KIND,
  compareFormatPhone,
  formatPhone,
  formatPhoneKeyed,
  formatPhoneMany,
  formatPhoneProduct,
  isFormatPhoneValid,
  summarizeFormatPhone,
} from './format-phone';
import { chunk, clampLength, hashString } from './format-phone-helpers';

describe('util-format-phone', () => {
  it('exposes its kind', () => {
    expect(FORMAT_PHONE_KIND).toBe('format-phone');
  });

  it('returns the fallback for empty input', () => {
    expect(formatPhone('')).toBe(FORMAT_PHONE_DEFAULTS.fallback);
    expect(formatPhone('   ')).toBe(FORMAT_PHONE_DEFAULTS.fallback);
    expect(formatPhone('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatPhone('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatPhone('same input')).toBe(formatPhone('same input'));
    expect(compareFormatPhone('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatPhoneMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatPhoneValid('value')).toBe(true);
    expect(isFormatPhoneValid(12)).toBe(true);
    expect(isFormatPhoneValid('')).toBe(false);
    expect(isFormatPhoneValid(Number.NaN)).toBe(false);
    expect(isFormatPhoneValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatPhoneProduct({
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
    const summary = summarizeFormatPhone(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatPhoneKeyed(
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
