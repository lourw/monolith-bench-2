import { describe, expect, it } from 'vitest';
import {
  buildSupportListItems,
  SUPPORT_LIST_ITEM_COUNT,
} from './support-list.model';
import {
  describeSupportListItem,
  filterSupportList,
  groupSupportListByStatus,
  pickSupportListHighlights,
  sortSupportList,
  totalSupportList,
  supportListStatusTone,
} from './support-list.utils';

describe('support-list utils', () => {
  const items = buildSupportListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportList(items, '')).toHaveLength(items.length);
    expect(
      filterSupportList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportList(items, 'amount', 'asc');
    const desc = sortSupportList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportListStatusTone('active')).toBe('success');
    expect(supportListStatusTone('pending')).toBe('warning');
    expect(supportListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportListHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportListHighlights(items, 0)).toHaveLength(0);
  });
});
