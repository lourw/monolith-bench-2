import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsDetailsItems,
  GIFT_CARDS_DETAILS_ITEM_COUNT,
} from './gift-cards-details.model';
import {
  describeGiftCardsDetailsItem,
  filterGiftCardsDetails,
  groupGiftCardsDetailsByStatus,
  pickGiftCardsDetailsHighlights,
  sortGiftCardsDetails,
  totalGiftCardsDetails,
  giftCardsDetailsStatusTone,
} from './gift-cards-details.utils';

describe('gift-cards-details utils', () => {
  const items = buildGiftCardsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsDetails(items, 'amount', 'asc');
    const desc = sortGiftCardsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsDetailsStatusTone('active')).toBe('success');
    expect(giftCardsDetailsStatusTone('pending')).toBe('warning');
    expect(giftCardsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
