import { describe, expect, it } from 'vitest';
import {
  buildSearchListItems,
  SEARCH_LIST_ITEM_COUNT,
} from './search-list.model';
import {
  describeSearchListItem,
  filterSearchList,
  groupSearchListByStatus,
  pickSearchListHighlights,
  sortSearchList,
  totalSearchList,
  searchListStatusTone,
} from './search-list.utils';

describe('search-list utils', () => {
  const items = buildSearchListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchList(items, '')).toHaveLength(items.length);
    expect(
      filterSearchList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchList(items, 'amount', 'asc');
    const desc = sortSearchList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchListStatusTone('active')).toBe('success');
    expect(searchListStatusTone('pending')).toBe('warning');
    expect(searchListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchListHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchListHighlights(items, 0)).toHaveLength(0);
  });
});
