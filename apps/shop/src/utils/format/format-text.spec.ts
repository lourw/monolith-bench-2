import { describe, expect, it } from 'vitest';
import {
  FORMAT_TEXT_DEFAULTS,
  FORMAT_TEXT_KIND,
  compareFormatText,
  formatText,
  formatTextKeyed,
  formatTextMany,
  formatTextProduct,
  isFormatTextValid,
  summarizeFormatText,
} from './format-text';
import { chunk, clampLength, hashString } from './format-text-helpers';

describe('util-format-text', () => {
  it('exposes its kind', () => {
    expect(FORMAT_TEXT_KIND).toBe('format-text');
  });

  it('returns the fallback for empty input', () => {
    expect(formatText('')).toBe(FORMAT_TEXT_DEFAULTS.fallback);
    expect(formatText('   ')).toBe(FORMAT_TEXT_DEFAULTS.fallback);
    expect(formatText('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatText('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatText('same input')).toBe(formatText('same input'));
    expect(compareFormatText('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatTextMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatTextValid('value')).toBe(true);
    expect(isFormatTextValid(12)).toBe(true);
    expect(isFormatTextValid('')).toBe(false);
    expect(isFormatTextValid(Number.NaN)).toBe(false);
    expect(isFormatTextValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatTextProduct({
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
    const summary = summarizeFormatText(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatTextKeyed(
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
