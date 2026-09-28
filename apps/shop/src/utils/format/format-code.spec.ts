import { describe, expect, it } from 'vitest';
import {
  FORMAT_CODE_DEFAULTS,
  FORMAT_CODE_KIND,
  compareFormatCode,
  formatCode,
  formatCodeKeyed,
  formatCodeMany,
  formatCodeProduct,
  isFormatCodeValid,
  summarizeFormatCode,
} from './format-code';
import { chunk, clampLength, hashString } from './format-code-helpers';

describe('util-format-code', () => {
  it('exposes its kind', () => {
    expect(FORMAT_CODE_KIND).toBe('format-code');
  });

  it('returns the fallback for empty input', () => {
    expect(formatCode('')).toBe(FORMAT_CODE_DEFAULTS.fallback);
    expect(formatCode('   ')).toBe(FORMAT_CODE_DEFAULTS.fallback);
    expect(formatCode('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatCode('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatCode('same input')).toBe(formatCode('same input'));
    expect(compareFormatCode('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatCodeMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatCodeValid('value')).toBe(true);
    expect(isFormatCodeValid(12)).toBe(true);
    expect(isFormatCodeValid('')).toBe(false);
    expect(isFormatCodeValid(Number.NaN)).toBe(false);
    expect(isFormatCodeValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatCodeProduct({
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
    const summary = summarizeFormatCode(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatCodeKeyed(
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
