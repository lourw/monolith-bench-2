import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsHistoryItems,
  ANALYTICS_HISTORY_ITEM_COUNT,
} from './analytics-history.model';
import {
  describeAnalyticsHistoryItem,
  filterAnalyticsHistory,
  groupAnalyticsHistoryByStatus,
  pickAnalyticsHistoryHighlights,
  sortAnalyticsHistory,
  totalAnalyticsHistory,
  analyticsHistoryStatusTone,
} from './analytics-history.utils';

describe('analytics-history utils', () => {
  const items = buildAnalyticsHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsHistory(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsHistory(items, 'amount', 'asc');
    const desc = sortAnalyticsHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsHistoryStatusTone('active')).toBe('success');
    expect(analyticsHistoryStatusTone('pending')).toBe('warning');
    expect(analyticsHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
