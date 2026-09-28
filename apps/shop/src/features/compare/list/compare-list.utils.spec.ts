import { describe, expect, it } from 'vitest';
import {
  buildCompareListItems,
  COMPARE_LIST_ITEM_COUNT,
} from './compare-list.model';
import {
  describeCompareListItem,
  filterCompareList,
  groupCompareListByStatus,
  pickCompareListHighlights,
  sortCompareList,
  totalCompareList,
  compareListStatusTone,
} from './compare-list.utils';

describe('compare-list utils', () => {
  const items = buildCompareListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareList(items, '')).toHaveLength(items.length);
    expect(
      filterCompareList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareList(items, 'amount', 'asc');
    const desc = sortCompareList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareListStatusTone('active')).toBe('success');
    expect(compareListStatusTone('pending')).toBe('warning');
    expect(compareListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareListHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareListHighlights(items, 0)).toHaveLength(0);
  });
});
