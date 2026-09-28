import { describe, expect, it } from 'vitest';
import {
  buildShippingHistoryItems,
  SHIPPING_HISTORY_ITEM_COUNT,
} from './shipping-history.model';
import {
  describeShippingHistoryItem,
  filterShippingHistory,
  groupShippingHistoryByStatus,
  pickShippingHistoryHighlights,
  sortShippingHistory,
  totalShippingHistory,
  shippingHistoryStatusTone,
} from './shipping-history.utils';

describe('shipping-history utils', () => {
  const items = buildShippingHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingHistory(items, '')).toHaveLength(items.length);
    expect(
      filterShippingHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingHistory(items, 'amount', 'asc');
    const desc = sortShippingHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingHistoryStatusTone('active')).toBe('success');
    expect(shippingHistoryStatusTone('pending')).toBe('warning');
    expect(shippingHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
