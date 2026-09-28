import { describe, expect, it } from 'vitest';
import {
  FORMAT_PERCENT_DEFAULTS,
  FORMAT_PERCENT_KIND,
  compareFormatPercent,
  formatPercent,
  formatPercentKeyed,
  formatPercentMany,
  formatPercentProduct,
  isFormatPercentValid,
  summarizeFormatPercent,
} from './format-percent';
import { chunk, clampLength, hashString } from './format-percent-helpers';

describe('util-format-percent', () => {
  it('exposes its kind', () => {
    expect(FORMAT_PERCENT_KIND).toBe('format-percent');
  });

  it('returns the fallback for empty input', () => {
    expect(formatPercent('')).toBe(FORMAT_PERCENT_DEFAULTS.fallback);
    expect(formatPercent('   ')).toBe(FORMAT_PERCENT_DEFAULTS.fallback);
    expect(formatPercent('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = formatPercent('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(formatPercent('same input')).toBe(formatPercent('same input'));
    expect(compareFormatPercent('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(formatPercentMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isFormatPercentValid('value')).toBe(true);
    expect(isFormatPercentValid(12)).toBe(true);
    expect(isFormatPercentValid('')).toBe(false);
    expect(isFormatPercentValid(Number.NaN)).toBe(false);
    expect(isFormatPercentValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = formatPercentProduct({
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
    const summary = summarizeFormatPercent(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = formatPercentKeyed(
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
