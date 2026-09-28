import { describe, expect, it } from 'vitest';
import {
  buildPromotionsHistoryItems,
  PROMOTIONS_HISTORY_ITEM_COUNT,
} from './promotions-history.model';
import {
  describePromotionsHistoryItem,
  filterPromotionsHistory,
  groupPromotionsHistoryByStatus,
  pickPromotionsHistoryHighlights,
  sortPromotionsHistory,
  totalPromotionsHistory,
  promotionsHistoryStatusTone,
} from './promotions-history.utils';

describe('promotions-history utils', () => {
  const items = buildPromotionsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsHistory(items, 'amount', 'asc');
    const desc = sortPromotionsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsHistoryStatusTone('active')).toBe('success');
    expect(promotionsHistoryStatusTone('pending')).toBe('warning');
    expect(promotionsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
