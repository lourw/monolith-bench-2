import { describe, expect, it } from 'vitest';
import {
  buildAccountSummaryItems,
  ACCOUNT_SUMMARY_ITEM_COUNT,
} from './account-summary.model';
import {
  describeAccountSummaryItem,
  filterAccountSummary,
  groupAccountSummaryByStatus,
  pickAccountSummaryHighlights,
  sortAccountSummary,
  totalAccountSummary,
  accountSummaryStatusTone,
} from './account-summary.utils';

describe('account-summary utils', () => {
  const items = buildAccountSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ACCOUNT_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ACCOUNT_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAccountSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAccountSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAccountSummary(items, '')).toHaveLength(items.length);
    expect(
      filterAccountSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAccountSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAccountSummary(items, 'amount', 'asc');
    const desc = sortAccountSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAccountSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(accountSummaryStatusTone('active')).toBe('success');
    expect(accountSummaryStatusTone('pending')).toBe('warning');
    expect(accountSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAccountSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickAccountSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
