import { describe, expect, it } from 'vitest';
import {
  buildReturnsOverviewItems,
  RETURNS_OVERVIEW_ITEM_COUNT,
} from './returns-overview.model';
import {
  describeReturnsOverviewItem,
  filterReturnsOverview,
  groupReturnsOverviewByStatus,
  pickReturnsOverviewHighlights,
  sortReturnsOverview,
  totalReturnsOverview,
  returnsOverviewStatusTone,
} from './returns-overview.utils';

describe('returns-overview utils', () => {
  const items = buildReturnsOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsOverview(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsOverview(items, 'amount', 'asc');
    const desc = sortReturnsOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsOverviewStatusTone('active')).toBe('success');
    expect(returnsOverviewStatusTone('pending')).toBe('warning');
    expect(returnsOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
