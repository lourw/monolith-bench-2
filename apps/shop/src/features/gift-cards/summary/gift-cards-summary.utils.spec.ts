import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsSummaryItems,
  GIFT_CARDS_SUMMARY_ITEM_COUNT,
} from './gift-cards-summary.model';
import {
  describeGiftCardsSummaryItem,
  filterGiftCardsSummary,
  groupGiftCardsSummaryByStatus,
  pickGiftCardsSummaryHighlights,
  sortGiftCardsSummary,
  totalGiftCardsSummary,
  giftCardsSummaryStatusTone,
} from './gift-cards-summary.utils';

describe('gift-cards-summary utils', () => {
  const items = buildGiftCardsSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsSummary(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsSummary(items, 'amount', 'asc');
    const desc = sortGiftCardsSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsSummaryStatusTone('active')).toBe('success');
    expect(giftCardsSummaryStatusTone('pending')).toBe('warning');
    expect(giftCardsSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
