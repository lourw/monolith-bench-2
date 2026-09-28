import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyDetailsItems,
  LOYALTY_DETAILS_ITEM_COUNT,
} from './loyalty-details.model';
import {
  describeLoyaltyDetailsItem,
  filterLoyaltyDetails,
  groupLoyaltyDetailsByStatus,
  pickLoyaltyDetailsHighlights,
  sortLoyaltyDetails,
  totalLoyaltyDetails,
  loyaltyDetailsStatusTone,
} from './loyalty-details.utils';

describe('loyalty-details utils', () => {
  const items = buildLoyaltyDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyDetails(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyDetails(items, 'amount', 'asc');
    const desc = sortLoyaltyDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyDetailsStatusTone('active')).toBe('success');
    expect(loyaltyDetailsStatusTone('pending')).toBe('warning');
    expect(loyaltyDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
