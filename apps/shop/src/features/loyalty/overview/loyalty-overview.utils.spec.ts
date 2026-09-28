import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyOverviewItems,
  LOYALTY_OVERVIEW_ITEM_COUNT,
} from './loyalty-overview.model';
import {
  describeLoyaltyOverviewItem,
  filterLoyaltyOverview,
  groupLoyaltyOverviewByStatus,
  pickLoyaltyOverviewHighlights,
  sortLoyaltyOverview,
  totalLoyaltyOverview,
  loyaltyOverviewStatusTone,
} from './loyalty-overview.utils';

describe('loyalty-overview utils', () => {
  const items = buildLoyaltyOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyOverview(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyOverview(items, 'amount', 'asc');
    const desc = sortLoyaltyOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyOverviewStatusTone('active')).toBe('success');
    expect(loyaltyOverviewStatusTone('pending')).toBe('warning');
    expect(loyaltyOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
