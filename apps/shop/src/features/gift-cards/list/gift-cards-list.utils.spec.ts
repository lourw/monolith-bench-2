import { describe, expect, it } from 'vitest';
import {
  buildGiftCardsListItems,
  GIFT_CARDS_LIST_ITEM_COUNT,
} from './gift-cards-list.model';
import {
  describeGiftCardsListItem,
  filterGiftCardsList,
  groupGiftCardsListByStatus,
  pickGiftCardsListHighlights,
  sortGiftCardsList,
  totalGiftCardsList,
  giftCardsListStatusTone,
} from './gift-cards-list.utils';

describe('gift-cards-list utils', () => {
  const items = buildGiftCardsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(GIFT_CARDS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      GIFT_CARDS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalGiftCardsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupGiftCardsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterGiftCardsList(items, '')).toHaveLength(items.length);
    expect(
      filterGiftCardsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterGiftCardsList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortGiftCardsList(items, 'amount', 'asc');
    const desc = sortGiftCardsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeGiftCardsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(giftCardsListStatusTone('active')).toBe('success');
    expect(giftCardsListStatusTone('pending')).toBe('warning');
    expect(giftCardsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickGiftCardsListHighlights(items, 2)).toHaveLength(2);
    expect(pickGiftCardsListHighlights(items, 0)).toHaveLength(0);
  });
});
