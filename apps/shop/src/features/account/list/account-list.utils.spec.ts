import { describe, expect, it } from 'vitest';
import {
  buildAccountListItems,
  ACCOUNT_LIST_ITEM_COUNT,
} from './account-list.model';
import {
  describeAccountListItem,
  filterAccountList,
  groupAccountListByStatus,
  pickAccountListHighlights,
  sortAccountList,
  totalAccountList,
  accountListStatusTone,
} from './account-list.utils';

describe('account-list utils', () => {
  const items = buildAccountListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ACCOUNT_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ACCOUNT_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAccountList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAccountListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAccountList(items, '')).toHaveLength(items.length);
    expect(
      filterAccountList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAccountList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAccountList(items, 'amount', 'asc');
    const desc = sortAccountList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAccountListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(accountListStatusTone('active')).toBe('success');
    expect(accountListStatusTone('pending')).toBe('warning');
    expect(accountListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAccountListHighlights(items, 2)).toHaveLength(2);
    expect(pickAccountListHighlights(items, 0)).toHaveLength(0);
  });
});
