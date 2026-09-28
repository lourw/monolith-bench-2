import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsInsightsItems,
  GIFT_CARDS_INSIGHTS_ITEM_COUNT,
} from './gift-cards-insights.model';
import {
  describeGiftCardsInsightsItem,
  filterGiftCardsInsights,
  groupGiftCardsInsightsByStatus,
  pickGiftCardsInsightsHighlights,
  sortGiftCardsInsights,
  totalGiftCardsInsights,
  giftCardsInsightsStatusTone,
} from './gift-cards-insights.utils';

describe('gift-cards-insights utils', () => {
  const items = buildGiftCardsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsInsights(items, 'amount', 'asc');
    const desc = sortGiftCardsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsInsightsStatusTone('active')).toBe('success');
    expect(giftCardsInsightsStatusTone('pending')).toBe('warning');
    expect(giftCardsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
