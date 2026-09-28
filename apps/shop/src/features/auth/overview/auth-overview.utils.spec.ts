import { describe, expect, it } from 'vitest';
import {
  buildAuthOverviewItems,
  AUTH_OVERVIEW_ITEM_COUNT,
} from './auth-overview.model';
import {
  describeAuthOverviewItem,
  filterAuthOverview,
  groupAuthOverviewByStatus,
  pickAuthOverviewHighlights,
  sortAuthOverview,
  totalAuthOverview,
  authOverviewStatusTone,
} from './auth-overview.utils';

describe('auth-overview utils', () => {
  const items = buildAuthOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthOverview(items, '')).toHaveLength(items.length);
    expect(
      filterAuthOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthOverview(items, 'amount', 'asc');
    const desc = sortAuthOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authOverviewStatusTone('active')).toBe('success');
    expect(authOverviewStatusTone('pending')).toBe('warning');
    expect(authOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
