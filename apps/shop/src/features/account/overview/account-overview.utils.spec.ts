import { describe, expect, it } from 'vitest';
import {
  buildAccountOverviewItems,
  ACCOUNT_OVERVIEW_ITEM_COUNT,
} from './account-overview.model';
import {
  describeAccountOverviewItem,
  filterAccountOverview,
  groupAccountOverviewByStatus,
  pickAccountOverviewHighlights,
  sortAccountOverview,
  totalAccountOverview,
  accountOverviewStatusTone,
} from './account-overview.utils';

describe('account-overview utils', () => {
  const items = buildAccountOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ACCOUNT_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ACCOUNT_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAccountOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAccountOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAccountOverview(items, '')).toHaveLength(items.length);
    expect(
      filterAccountOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAccountOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAccountOverview(items, 'amount', 'asc');
    const desc = sortAccountOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAccountOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(accountOverviewStatusTone('active')).toBe('success');
    expect(accountOverviewStatusTone('pending')).toBe('warning');
    expect(accountOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAccountOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickAccountOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
