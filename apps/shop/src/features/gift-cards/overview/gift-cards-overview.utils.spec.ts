import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsOverviewItems,
  GIFT_CARDS_OVERVIEW_ITEM_COUNT,
} from './gift-cards-overview.model';
import {
  describeGiftCardsOverviewItem,
  filterGiftCardsOverview,
  groupGiftCardsOverviewByStatus,
  pickGiftCardsOverviewHighlights,
  sortGiftCardsOverview,
  totalGiftCardsOverview,
  giftCardsOverviewStatusTone,
} from './gift-cards-overview.utils';

describe('gift-cards-overview utils', () => {
  const items = buildGiftCardsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsOverview(items, 'amount', 'asc');
    const desc = sortGiftCardsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsOverviewStatusTone('active')).toBe('success');
    expect(giftCardsOverviewStatusTone('pending')).toBe('warning');
    expect(giftCardsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
