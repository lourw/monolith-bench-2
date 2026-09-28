import { describe, expect, it } from 'vitest';
import {
  buildCartHistoryItems,
  CART_HISTORY_ITEM_COUNT,
} from './cart-history.model';
import {
  describeCartHistoryItem,
  filterCartHistory,
  groupCartHistoryByStatus,
  pickCartHistoryHighlights,
  sortCartHistory,
  totalCartHistory,
  cartHistoryStatusTone,
} from './cart-history.utils';

describe('cart-history utils', () => {
  const items = buildCartHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartHistory(items, '')).toHaveLength(items.length);
    expect(
      filterCartHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartHistory(items, 'amount', 'asc');
    const desc = sortCartHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartHistoryStatusTone('active')).toBe('success');
    expect(cartHistoryStatusTone('pending')).toBe('warning');
    expect(cartHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickCartHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
