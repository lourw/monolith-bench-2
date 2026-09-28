import { describe, expect, it } from 'vitest';
import {
  buildCompareOverviewItems,
  COMPARE_OVERVIEW_ITEM_COUNT,
} from './compare-overview.model';
import {
  describeCompareOverviewItem,
  filterCompareOverview,
  groupCompareOverviewByStatus,
  pickCompareOverviewHighlights,
  sortCompareOverview,
  totalCompareOverview,
  compareOverviewStatusTone,
} from './compare-overview.utils';

describe('compare-overview utils', () => {
  const items = buildCompareOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareOverview(items, '')).toHaveLength(items.length);
    expect(
      filterCompareOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareOverview(items, 'amount', 'asc');
    const desc = sortCompareOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareOverviewStatusTone('active')).toBe('success');
    expect(compareOverviewStatusTone('pending')).toBe('warning');
    expect(compareOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
