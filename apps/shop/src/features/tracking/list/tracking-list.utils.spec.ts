import { describe, expect, it } from 'vitest';
import {
  buildTrackingListItems,
  TRACKING_LIST_ITEM_COUNT,
} from './tracking-list.model';
import {
  describeTrackingListItem,
  filterTrackingList,
  groupTrackingListByStatus,
  pickTrackingListHighlights,
  sortTrackingList,
  totalTrackingList,
  trackingListStatusTone,
} from './tracking-list.utils';

describe('tracking-list utils', () => {
  const items = buildTrackingListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingList(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingList(items, 'amount', 'asc');
    const desc = sortTrackingList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingListStatusTone('active')).toBe('success');
    expect(trackingListStatusTone('pending')).toBe('warning');
    expect(trackingListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingListHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingListHighlights(items, 0)).toHaveLength(0);
  });
});
