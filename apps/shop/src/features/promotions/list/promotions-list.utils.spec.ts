import { describe, expect, it } from 'vitest';
import {
  buildPromotionsListItems,
  PROMOTIONS_LIST_ITEM_COUNT,
} from './promotions-list.model';
import {
  describePromotionsListItem,
  filterPromotionsList,
  groupPromotionsListByStatus,
  pickPromotionsListHighlights,
  sortPromotionsList,
  totalPromotionsList,
  promotionsListStatusTone,
} from './promotions-list.utils';

describe('promotions-list utils', () => {
  const items = buildPromotionsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsList(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsList(items, 'amount', 'asc');
    const desc = sortPromotionsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsListStatusTone('active')).toBe('success');
    expect(promotionsListStatusTone('pending')).toBe('warning');
    expect(promotionsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsListHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsListHighlights(items, 0)).toHaveLength(0);
  });
});
