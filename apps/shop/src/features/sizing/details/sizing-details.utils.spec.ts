import { describe, expect, it } from 'vitest';
import {
  buildSizingDetailsItems,
  SIZING_DETAILS_ITEM_COUNT,
} from './sizing-details.model';
import {
  describeSizingDetailsItem,
  filterSizingDetails,
  groupSizingDetailsByStatus,
  pickSizingDetailsHighlights,
  sortSizingDetails,
  totalSizingDetails,
  sizingDetailsStatusTone,
} from './sizing-details.utils';

describe('sizing-details utils', () => {
  const items = buildSizingDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingDetails(items, '')).toHaveLength(items.length);
    expect(
      filterSizingDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingDetails(items, 'amount', 'asc');
    const desc = sortSizingDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingDetailsStatusTone('active')).toBe('success');
    expect(sizingDetailsStatusTone('pending')).toBe('warning');
    expect(sizingDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
