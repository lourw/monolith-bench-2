import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorSummaryItems,
  STORE_LOCATOR_SUMMARY_ITEM_COUNT,
} from './store-locator-summary.model';
import {
  describeStoreLocatorSummaryItem,
  filterStoreLocatorSummary,
  groupStoreLocatorSummaryByStatus,
  pickStoreLocatorSummaryHighlights,
  sortStoreLocatorSummary,
  totalStoreLocatorSummary,
  storeLocatorSummaryStatusTone,
} from './store-locator-summary.utils';

describe('store-locator-summary utils', () => {
  const items = buildStoreLocatorSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorSummary(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterStoreLocatorSummary(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorSummary(items, 'amount', 'asc');
    const desc = sortStoreLocatorSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorSummaryStatusTone('active')).toBe('success');
    expect(storeLocatorSummaryStatusTone('pending')).toBe('warning');
    expect(storeLocatorSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
