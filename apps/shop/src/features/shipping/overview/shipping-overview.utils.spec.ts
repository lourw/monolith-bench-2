import { describe, expect, it } from 'vitest';
import {
  buildShippingOverviewItems,
  SHIPPING_OVERVIEW_ITEM_COUNT,
} from './shipping-overview.model';
import {
  describeShippingOverviewItem,
  filterShippingOverview,
  groupShippingOverviewByStatus,
  pickShippingOverviewHighlights,
  sortShippingOverview,
  totalShippingOverview,
  shippingOverviewStatusTone,
} from './shipping-overview.utils';

describe('shipping-overview utils', () => {
  const items = buildShippingOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SHIPPING_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SHIPPING_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalShippingOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupShippingOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterShippingOverview(items, '')).toHaveLength(items.length);
    expect(
      filterShippingOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterShippingOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortShippingOverview(items, 'amount', 'asc');
    const desc = sortShippingOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeShippingOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(shippingOverviewStatusTone('active')).toBe('success');
    expect(shippingOverviewStatusTone('pending')).toBe('warning');
    expect(shippingOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickShippingOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickShippingOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
