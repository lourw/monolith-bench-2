import { describe, expect, it } from 'vitest';
import {
  buildAccountHistoryItems,
  ACCOUNT_HISTORY_ITEM_COUNT,
} from './account-history.model';
import {
  describeAccountHistoryItem,
  filterAccountHistory,
  groupAccountHistoryByStatus,
  pickAccountHistoryHighlights,
  sortAccountHistory,
  totalAccountHistory,
  accountHistoryStatusTone,
} from './account-history.utils';

describe('account-history utils', () => {
  const items = buildAccountHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ACCOUNT_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ACCOUNT_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAccountHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAccountHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAccountHistory(items, '')).toHaveLength(items.length);
    expect(
      filterAccountHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAccountHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAccountHistory(items, 'amount', 'asc');
    const desc = sortAccountHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAccountHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(accountHistoryStatusTone('active')).toBe('success');
    expect(accountHistoryStatusTone('pending')).toBe('warning');
    expect(accountHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAccountHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickAccountHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
