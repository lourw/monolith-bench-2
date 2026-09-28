import { describe, expect, it } from 'vitest';
import {
  buildSizingOverviewItems,
  SIZING_OVERVIEW_ITEM_COUNT,
} from './sizing-overview.model';
import {
  describeSizingOverviewItem,
  filterSizingOverview,
  groupSizingOverviewByStatus,
  pickSizingOverviewHighlights,
  sortSizingOverview,
  totalSizingOverview,
  sizingOverviewStatusTone,
} from './sizing-overview.utils';

describe('sizing-overview utils', () => {
  const items = buildSizingOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingOverview(items, '')).toHaveLength(items.length);
    expect(
      filterSizingOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingOverview(items, 'amount', 'asc');
    const desc = sortSizingOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingOverviewStatusTone('active')).toBe('success');
    expect(sizingOverviewStatusTone('pending')).toBe('warning');
    expect(sizingOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
