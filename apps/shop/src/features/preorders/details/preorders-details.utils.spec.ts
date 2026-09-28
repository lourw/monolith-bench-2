import { describe, expect, it } from 'vitest';
import {
  buildPreordersDetailsItems,
  PREORDERS_DETAILS_ITEM_COUNT,
} from './preorders-details.model';
import {
  describePreordersDetailsItem,
  filterPreordersDetails,
  groupPreordersDetailsByStatus,
  pickPreordersDetailsHighlights,
  sortPreordersDetails,
  totalPreordersDetails,
  preordersDetailsStatusTone,
} from './preorders-details.utils';

describe('preorders-details utils', () => {
  const items = buildPreordersDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersDetails(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersDetails(items, 'amount', 'asc');
    const desc = sortPreordersDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersDetailsStatusTone('active')).toBe('success');
    expect(preordersDetailsStatusTone('pending')).toBe('warning');
    expect(preordersDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
