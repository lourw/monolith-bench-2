import { describe, expect, it } from 'vitest';
import {
  buildTrackingHistoryItems,
  TRACKING_HISTORY_ITEM_COUNT,
} from './tracking-history.model';
import {
  describeTrackingHistoryItem,
  filterTrackingHistory,
  groupTrackingHistoryByStatus,
  pickTrackingHistoryHighlights,
  sortTrackingHistory,
  totalTrackingHistory,
  trackingHistoryStatusTone,
} from './tracking-history.utils';

describe('tracking-history utils', () => {
  const items = buildTrackingHistoryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_HISTORY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_HISTORY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingHistory(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingHistoryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingHistory(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingHistory(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingHistory(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingHistory(items, 'amount', 'asc');
    const desc = sortTrackingHistory(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingHistoryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingHistoryStatusTone('active')).toBe('success');
    expect(trackingHistoryStatusTone('pending')).toBe('warning');
    expect(trackingHistoryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingHistoryHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingHistoryHighlights(items, 0)).toHaveLength(0);
  });
});
