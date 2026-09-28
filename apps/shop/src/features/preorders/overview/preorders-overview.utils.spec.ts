import { describe, expect, it } from 'vitest';
import {
  buildPreordersOverviewItems,
  PREORDERS_OVERVIEW_ITEM_COUNT,
} from './preorders-overview.model';
import {
  describePreordersOverviewItem,
  filterPreordersOverview,
  groupPreordersOverviewByStatus,
  pickPreordersOverviewHighlights,
  sortPreordersOverview,
  totalPreordersOverview,
  preordersOverviewStatusTone,
} from './preorders-overview.utils';

describe('preorders-overview utils', () => {
  const items = buildPreordersOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersOverview(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersOverview(items, 'amount', 'asc');
    const desc = sortPreordersOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersOverviewStatusTone('active')).toBe('success');
    expect(preordersOverviewStatusTone('pending')).toBe('warning');
    expect(preordersOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
