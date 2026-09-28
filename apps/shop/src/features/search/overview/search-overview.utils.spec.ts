import { describe, expect, it } from 'vitest';
import {
  buildSearchOverviewItems,
  SEARCH_OVERVIEW_ITEM_COUNT,
} from './search-overview.model';
import {
  describeSearchOverviewItem,
  filterSearchOverview,
  groupSearchOverviewByStatus,
  pickSearchOverviewHighlights,
  sortSearchOverview,
  totalSearchOverview,
  searchOverviewStatusTone,
} from './search-overview.utils';

describe('search-overview utils', () => {
  const items = buildSearchOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchOverview(items, '')).toHaveLength(items.length);
    expect(
      filterSearchOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchOverview(items, 'amount', 'asc');
    const desc = sortSearchOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchOverviewStatusTone('active')).toBe('success');
    expect(searchOverviewStatusTone('pending')).toBe('warning');
    expect(searchOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
