import { describe, expect, it } from 'vitest';
import {
  buildReturnsListItems,
  RETURNS_LIST_ITEM_COUNT,
} from './returns-list.model';
import {
  describeReturnsListItem,
  filterReturnsList,
  groupReturnsListByStatus,
  pickReturnsListHighlights,
  sortReturnsList,
  totalReturnsList,
  returnsListStatusTone,
} from './returns-list.utils';

describe('returns-list utils', () => {
  const items = buildReturnsListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsList(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsList(items, 'amount', 'asc');
    const desc = sortReturnsList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsListStatusTone('active')).toBe('success');
    expect(returnsListStatusTone('pending')).toBe('warning');
    expect(returnsListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsListHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsListHighlights(items, 0)).toHaveLength(0);
  });
});
