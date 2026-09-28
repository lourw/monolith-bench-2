import { describe, expect, it } from 'vitest';
import {
  buildPromotionsSummaryItems,
  PROMOTIONS_SUMMARY_ITEM_COUNT,
} from './promotions-summary.model';
import {
  describePromotionsSummaryItem,
  filterPromotionsSummary,
  groupPromotionsSummaryByStatus,
  pickPromotionsSummaryHighlights,
  sortPromotionsSummary,
  totalPromotionsSummary,
  promotionsSummaryStatusTone,
} from './promotions-summary.utils';

describe('promotions-summary utils', () => {
  const items = buildPromotionsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsSummary(items, 'amount', 'asc');
    const desc = sortPromotionsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsSummaryStatusTone('active')).toBe('success');
    expect(promotionsSummaryStatusTone('pending')).toBe('warning');
    expect(promotionsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
