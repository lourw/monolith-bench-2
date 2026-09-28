import { describe, expect, it } from 'vitest';
import {
  buildSearchSummaryItems,
  SEARCH_SUMMARY_ITEM_COUNT,
} from './search-summary.model';
import {
  describeSearchSummaryItem,
  filterSearchSummary,
  groupSearchSummaryByStatus,
  pickSearchSummaryHighlights,
  sortSearchSummary,
  totalSearchSummary,
  searchSummaryStatusTone,
} from './search-summary.utils';

describe('search-summary utils', () => {
  const items = buildSearchSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchSummary(items, '')).toHaveLength(items.length);
    expect(
      filterSearchSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchSummary(items, 'amount', 'asc');
    const desc = sortSearchSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchSummaryStatusTone('active')).toBe('success');
    expect(searchSummaryStatusTone('pending')).toBe('warning');
    expect(searchSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
