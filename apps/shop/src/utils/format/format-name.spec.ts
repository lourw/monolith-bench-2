import { describe, expect, it } from 'vitest';
import {
  FORMAT_NAME_DEFAULTS,
  FORMAT_NAME_KIND,
  compareFormatName,
  formatName,
  formatNameKeyed,
  formatNameMany,
  formatNameProduct,
  isFormatNameValid,
  summarizeFormatName,
} from './format-name';
import { chunk, clampLength, hashString } from './format-name-helpers';

describe('util-format-name', () => {
  it('exposes its kind', () => {
    expect(FORMAT_NAME_KIND).toBe('format-name');
  });

  it('returns the fallback for empty input', () => {
    expect(formatName('')).toBe(FORMAT_NAME_DEFAULTS.fallback);
    expect(formatName('   ')).toBe(FORMAT_NAME_DEFAULTS.fallback);
    expect(formatName('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatName('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatName('same input')).toBe(formatName('same input'));
    expect(compareFormatName('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatNameMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatNameValid('value')).toBe(true);
    expect(isFormatNameValid(12)).toBe(true);
    expect(isFormatNameValid('')).toBe(false);
    expect(isFormatNameValid(Number.NaN)).toBe(false);
    expect(isFormatNameValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatNameProduct({
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
    const summary = summarizeFormatName(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatNameKeyed(
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
