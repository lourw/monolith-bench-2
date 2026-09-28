import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorDetailsItems,
  STORE_LOCATOR_DETAILS_ITEM_COUNT,
} from './store-locator-details.model';
import {
  describeStoreLocatorDetailsItem,
  filterStoreLocatorDetails,
  groupStoreLocatorDetailsByStatus,
  pickStoreLocatorDetailsHighlights,
  sortStoreLocatorDetails,
  totalStoreLocatorDetails,
  storeLocatorDetailsStatusTone,
} from './store-locator-details.utils';

describe('store-locator-details utils', () => {
  const items = buildStoreLocatorDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorDetails(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterStoreLocatorDetails(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorDetails(items, 'amount', 'asc');
    const desc = sortStoreLocatorDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorDetailsStatusTone('active')).toBe('success');
    expect(storeLocatorDetailsStatusTone('pending')).toBe('warning');
    expect(storeLocatorDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
