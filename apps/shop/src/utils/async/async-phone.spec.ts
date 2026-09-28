import { describe, expect, it } from 'vitest';
import {
  ASYNC_PHONE_DEFAULTS,
  ASYNC_PHONE_KIND,
  compareAsyncPhone,
  asyncPhone,
  asyncPhoneKeyed,
  asyncPhoneMany,
  asyncPhoneProduct,
  isAsyncPhoneValid,
  summarizeAsyncPhone,
} from './async-phone';
import { chunk, clampLength, hashString } from './async-phone-helpers';

describe('util-async-phone', () => {
  it('exposes its kind', () => {
    expect(ASYNC_PHONE_KIND).toBe('async-phone');
  });

  it('returns the fallback for empty input', () => {
    expect(asyncPhone('')).toBe(ASYNC_PHONE_DEFAULTS.fallback);
    expect(asyncPhone('   ')).toBe(ASYNC_PHONE_DEFAULTS.fallback);
    expect(asyncPhone('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = asyncPhone('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(asyncPhone('same input')).toBe(asyncPhone('same input'));
    expect(compareAsyncPhone('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(asyncPhoneMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isAsyncPhoneValid('value')).toBe(true);
    expect(isAsyncPhoneValid(12)).toBe(true);
    expect(isAsyncPhoneValid('')).toBe(false);
    expect(isAsyncPhoneValid(Number.NaN)).toBe(false);
    expect(isAsyncPhoneValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = asyncPhoneProduct({
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
    const summary = summarizeAsyncPhone(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = asyncPhoneKeyed(
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
