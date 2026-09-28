import { describe, expect, it } from 'vitest';
import {
  buildPromotionsOverviewItems,
  PROMOTIONS_OVERVIEW_ITEM_COUNT,
} from './promotions-overview.model';
import {
  describePromotionsOverviewItem,
  filterPromotionsOverview,
  groupPromotionsOverviewByStatus,
  pickPromotionsOverviewHighlights,
  sortPromotionsOverview,
  totalPromotionsOverview,
  promotionsOverviewStatusTone,
} from './promotions-overview.utils';

describe('promotions-overview utils', () => {
  const items = buildPromotionsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PROMOTIONS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PROMOTIONS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPromotionsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPromotionsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPromotionsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterPromotionsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPromotionsOverview(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortPromotionsOverview(items, 'amount', 'asc');
    const desc = sortPromotionsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePromotionsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(promotionsOverviewStatusTone('active')).toBe('success');
    expect(promotionsOverviewStatusTone('pending')).toBe('warning');
    expect(promotionsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPromotionsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickPromotionsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
