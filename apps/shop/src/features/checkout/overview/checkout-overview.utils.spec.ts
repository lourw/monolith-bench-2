import { describe, expect, it } from 'vitest';
import {
  buildCheckoutOverviewItems,
  CHECKOUT_OVERVIEW_ITEM_COUNT,
} from './checkout-overview.model';
import {
  describeCheckoutOverviewItem,
  filterCheckoutOverview,
  groupCheckoutOverviewByStatus,
  pickCheckoutOverviewHighlights,
  sortCheckoutOverview,
  totalCheckoutOverview,
  checkoutOverviewStatusTone,
} from './checkout-overview.utils';

describe('checkout-overview utils', () => {
  const items = buildCheckoutOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(CHECKOUT_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      CHECKOUT_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCheckoutOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCheckoutOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCheckoutOverview(items, '')).toHaveLength(items.length);
    expect(
      filterCheckoutOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCheckoutOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCheckoutOverview(items, 'amount', 'asc');
    const desc = sortCheckoutOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCheckoutOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(checkoutOverviewStatusTone('active')).toBe('success');
    expect(checkoutOverviewStatusTone('pending')).toBe('warning');
    expect(checkoutOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCheckoutOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickCheckoutOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
