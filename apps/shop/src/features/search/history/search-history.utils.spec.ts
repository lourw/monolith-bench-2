import { describe, expect, it } from 'vitest';
import {
  buildSearchHistoryItems,
  SEARCH_HISTORY_ITEM_COUNT,
} from './search-history.model';
import {
  describeSearchHistoryItem,
  filterSearchHistory,
  groupSearchHistoryByStatus,
  pickSearchHistoryHighlights,
  sortSearchHistory,
  totalSearchHistory,
  searchHistoryStatusTone,
} from './search-history.utils';

describe('search-history utils', () => {
  const items = buildSearchHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchHistory(items, '')).toHaveLength(items.length);
    expect(
      filterSearchHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchHistory(items, 'amount', 'asc');
    const desc = sortSearchHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchHistoryStatusTone('active')).toBe('success');
    expect(searchHistoryStatusTone('pending')).toBe('warning');
    expect(searchHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
