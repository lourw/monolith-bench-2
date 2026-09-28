import { describe, expect, it } from 'vitest';
import {
  buildAuthHistoryItems,
  AUTH_HISTORY_ITEM_COUNT,
} from './auth-history.model';
import {
  describeAuthHistoryItem,
  filterAuthHistory,
  groupAuthHistoryByStatus,
  pickAuthHistoryHighlights,
  sortAuthHistory,
  totalAuthHistory,
  authHistoryStatusTone,
} from './auth-history.utils';

describe('auth-history utils', () => {
  const items = buildAuthHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthHistory(items, '')).toHaveLength(items.length);
    expect(
      filterAuthHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthHistory(items, 'amount', 'asc');
    const desc = sortAuthHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authHistoryStatusTone('active')).toBe('success');
    expect(authHistoryStatusTone('pending')).toBe('warning');
    expect(authHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
