import { describe, expect, it } from 'vitest';
import {
  buildAddressesOverviewItems,
  ADDRESSES_OVERVIEW_ITEM_COUNT,
} from './addresses-overview.model';
import {
  describeAddressesOverviewItem,
  filterAddressesOverview,
  groupAddressesOverviewByStatus,
  pickAddressesOverviewHighlights,
  sortAddressesOverview,
  totalAddressesOverview,
  addressesOverviewStatusTone,
} from './addresses-overview.utils';

describe('addresses-overview utils', () => {
  const items = buildAddressesOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesOverview(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesOverview(items, 'amount', 'asc');
    const desc = sortAddressesOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesOverviewStatusTone('active')).toBe('success');
    expect(addressesOverviewStatusTone('pending')).toBe('warning');
    expect(addressesOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
