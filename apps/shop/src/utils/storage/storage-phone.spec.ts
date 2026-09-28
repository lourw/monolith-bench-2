import { describe, expect, it } from 'vitest';
import {
  STORAGE_PHONE_DEFAULTS,
  STORAGE_PHONE_KIND,
  compareStoragePhone,
  storagePhone,
  storagePhoneKeyed,
  storagePhoneMany,
  storagePhoneProduct,
  isStoragePhoneValid,
  summarizeStoragePhone,
} from './storage-phone';
import { chunk, clampLength, hashString } from './storage-phone-helpers';

describe('util-storage-phone', () => {
  it('exposes its kind', () => {
    expect(STORAGE_PHONE_KIND).toBe('storage-phone');
  });

  it('returns the fallback for empty input', () => {
    expect(storagePhone('')).toBe(STORAGE_PHONE_DEFAULTS.fallback);
    expect(storagePhone('   ')).toBe(STORAGE_PHONE_DEFAULTS.fallback);
    expect(storagePhone('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = storagePhone('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(storagePhone('same input')).toBe(storagePhone('same input'));
    expect(compareStoragePhone('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(storagePhoneMany(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(isStoragePhoneValid('value')).toBe(true);
    expect(isStoragePhoneValid(12)).toBe(true);
    expect(isStoragePhoneValid('')).toBe(false);
    expect(isStoragePhoneValid(Number.NaN)).toBe(false);
    expect(isStoragePhoneValid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = storagePhoneProduct({
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
    const summary = summarizeStoragePhone(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(
      summary.shortest.length,
    );
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = storagePhoneKeyed(
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
