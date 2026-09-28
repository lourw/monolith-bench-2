import { describe, expect, it } from 'vitest';
import {
  buildSizingListItems,
  SIZING_LIST_ITEM_COUNT,
} from './sizing-list.model';
import {
  describeSizingListItem,
  filterSizingList,
  groupSizingListByStatus,
  pickSizingListHighlights,
  sortSizingList,
  totalSizingList,
  sizingListStatusTone,
} from './sizing-list.utils';

describe('sizing-list utils', () => {
  const items = buildSizingListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingList(items, '')).toHaveLength(items.length);
    expect(
      filterSizingList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingList(items, 'amount', 'asc');
    const desc = sortSizingList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingListStatusTone('active')).toBe('success');
    expect(sizingListStatusTone('pending')).toBe('warning');
    expect(sizingListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingListHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingListHighlights(items, 0)).toHaveLength(0);
  });
});
