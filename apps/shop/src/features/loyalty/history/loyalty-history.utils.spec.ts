import { describe, expect, it } from 'vitest';
import {
  buildLoyaltyHistoryItems,
  LOYALTY_HISTORY_ITEM_COUNT,
} from './loyalty-history.model';
import {
  describeLoyaltyHistoryItem,
  filterLoyaltyHistory,
  groupLoyaltyHistoryByStatus,
  pickLoyaltyHistoryHighlights,
  sortLoyaltyHistory,
  totalLoyaltyHistory,
  loyaltyHistoryStatusTone,
} from './loyalty-history.utils';

describe('loyalty-history utils', () => {
  const items = buildLoyaltyHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(LOYALTY_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      LOYALTY_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalLoyaltyHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupLoyaltyHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterLoyaltyHistory(items, '')).toHaveLength(items.length);
    expect(
      filterLoyaltyHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterLoyaltyHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortLoyaltyHistory(items, 'amount', 'asc');
    const desc = sortLoyaltyHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeLoyaltyHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(loyaltyHistoryStatusTone('active')).toBe('success');
    expect(loyaltyHistoryStatusTone('pending')).toBe('warning');
    expect(loyaltyHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickLoyaltyHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickLoyaltyHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
