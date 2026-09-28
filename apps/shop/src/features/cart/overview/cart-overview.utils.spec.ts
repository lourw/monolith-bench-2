import { describe, expect, it } from 'vitest';
import {
  buildCartOverviewItems,
  CART_OVERVIEW_ITEM_COUNT,
} from './cart-overview.model';
import {
  describeCartOverviewItem,
  filterCartOverview,
  groupCartOverviewByStatus,
  pickCartOverviewHighlights,
  sortCartOverview,
  totalCartOverview,
  cartOverviewStatusTone,
} from './cart-overview.utils';

describe('cart-overview utils', () => {
  const items = buildCartOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CART_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CART_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCartOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCartOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCartOverview(items, '')).toHaveLength(items.length);
    expect(
      filterCartOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCartOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCartOverview(items, 'amount', 'asc');
    const desc = sortCartOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCartOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(cartOverviewStatusTone('active')).toBe('success');
    expect(cartOverviewStatusTone('pending')).toBe('warning');
    expect(cartOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCartOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickCartOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
