import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyListItems,
  LOYALTY_LIST_ITEM_COUNT,
} from './loyalty-list.model';
import {
  describeLoyaltyListItem,
  filterLoyaltyList,
  groupLoyaltyListByStatus,
  pickLoyaltyListHighlights,
  sortLoyaltyList,
  totalLoyaltyList,
  loyaltyListStatusTone,
} from './loyalty-list.utils';

describe('loyalty-list utils', () => {
  const items = buildLoyaltyListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyList(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyList(items, 'amount', 'asc');
    const desc = sortLoyaltyList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyListStatusTone('active')).toBe('success');
    expect(loyaltyListStatusTone('pending')).toBe('warning');
    expect(loyaltyListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyListHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyListHighlights(items, 0)).toHaveLength(0);
  });
});
