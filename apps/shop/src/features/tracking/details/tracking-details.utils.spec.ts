import { describe, expect, it } from 'vitest';
import {
  buildTrackingDetailsItems,
  TRACKING_DETAILS_ITEM_COUNT,
} from './tracking-details.model';
import {
  describeTrackingDetailsItem,
  filterTrackingDetails,
  groupTrackingDetailsByStatus,
  pickTrackingDetailsHighlights,
  sortTrackingDetails,
  totalTrackingDetails,
  trackingDetailsStatusTone,
} from './tracking-details.utils';

describe('tracking-details utils', () => {
  const items = buildTrackingDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingDetails(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingDetails(items, 'amount', 'asc');
    const desc = sortTrackingDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingDetailsStatusTone('active')).toBe('success');
    expect(trackingDetailsStatusTone('pending')).toBe('warning');
    expect(trackingDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
