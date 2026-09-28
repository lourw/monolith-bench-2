import { describe, expect, it } from 'vitest';
import {
  buildTrackingSummaryItems,
  TRACKING_SUMMARY_ITEM_COUNT,
} from './tracking-summary.model';
import {
  describeTrackingSummaryItem,
  filterTrackingSummary,
  groupTrackingSummaryByStatus,
  pickTrackingSummaryHighlights,
  sortTrackingSummary,
  totalTrackingSummary,
  trackingSummaryStatusTone,
} from './tracking-summary.utils';

describe('tracking-summary utils', () => {
  const items = buildTrackingSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingSummary(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingSummary(items, 'amount', 'asc');
    const desc = sortTrackingSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingSummaryStatusTone('active')).toBe('success');
    expect(trackingSummaryStatusTone('pending')).toBe('warning');
    expect(trackingSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
