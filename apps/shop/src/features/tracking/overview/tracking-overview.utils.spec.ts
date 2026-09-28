import { describe, expect, it } from 'vitest';
import {
  buildTrackingOverviewItems,
  TRACKING_OVERVIEW_ITEM_COUNT,
} from './tracking-overview.model';
import {
  describeTrackingOverviewItem,
  filterTrackingOverview,
  groupTrackingOverviewByStatus,
  pickTrackingOverviewHighlights,
  sortTrackingOverview,
  totalTrackingOverview,
  trackingOverviewStatusTone,
} from './tracking-overview.utils';

describe('tracking-overview utils', () => {
  const items = buildTrackingOverviewItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_OVERVIEW_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_OVERVIEW_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingOverview(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingOverviewByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingOverview(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingOverview(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingOverview(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingOverview(items, 'amount', 'asc');
    const desc = sortTrackingOverview(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingOverviewItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingOverviewStatusTone('active')).toBe('success');
    expect(trackingOverviewStatusTone('pending')).toBe('warning');
    expect(trackingOverviewStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingOverviewHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingOverviewHighlights(items, 0)).toHaveLength(0);
  });
});
