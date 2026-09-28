import { describe, expect, it } from 'vitest';
import {
  buildAuthSummaryItems,
  AUTH_SUMMARY_ITEM_COUNT,
} from './auth-summary.model';
import {
  describeAuthSummaryItem,
  filterAuthSummary,
  groupAuthSummaryByStatus,
  pickAuthSummaryHighlights,
  sortAuthSummary,
  totalAuthSummary,
  authSummaryStatusTone,
} from './auth-summary.utils';

describe('auth-summary utils', () => {
  const items = buildAuthSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthSummary(items, '')).toHaveLength(items.length);
    expect(
      filterAuthSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthSummary(items, 'amount', 'asc');
    const desc = sortAuthSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authSummaryStatusTone('active')).toBe('success');
    expect(authSummaryStatusTone('pending')).toBe('warning');
    expect(authSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
