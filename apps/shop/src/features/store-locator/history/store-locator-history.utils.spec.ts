import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorHistoryItems,
  STORE_LOCATOR_HISTORY_ITEM_COUNT,
} from './store-locator-history.model';
import {
  describeStoreLocatorHistoryItem,
  filterStoreLocatorHistory,
  groupStoreLocatorHistoryByStatus,
  pickStoreLocatorHistoryHighlights,
  sortStoreLocatorHistory,
  totalStoreLocatorHistory,
  storeLocatorHistoryStatusTone,
} from './store-locator-history.utils';

describe('store-locator-history utils', () => {
  const items = buildStoreLocatorHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorHistory(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterStoreLocatorHistory(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorHistory(items, 'amount', 'asc');
    const desc = sortStoreLocatorHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorHistoryStatusTone('active')).toBe('success');
    expect(storeLocatorHistoryStatusTone('pending')).toBe('warning');
    expect(storeLocatorHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
