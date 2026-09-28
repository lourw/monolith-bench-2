import { describe, expect, it } from 'vitest';
import {
  buildPreordersListItems,
  PREORDERS_LIST_ITEM_COUNT,
} from './preorders-list.model';
import {
  describePreordersListItem,
  filterPreordersList,
  groupPreordersListByStatus,
  pickPreordersListHighlights,
  sortPreordersList,
  totalPreordersList,
  preordersListStatusTone,
} from './preorders-list.utils';

describe('preorders-list utils', () => {
  const items = buildPreordersListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersList(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersList(items, 'amount', 'asc');
    const desc = sortPreordersList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersListStatusTone('active')).toBe('success');
    expect(preordersListStatusTone('pending')).toBe('warning');
    expect(preordersListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersListHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersListHighlights(items, 0)).toHaveLength(0);
  });
});
