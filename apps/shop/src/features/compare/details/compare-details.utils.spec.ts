import { describe, expect, it } from 'vitest';
import {
  buildCompareDetailsItems,
  COMPARE_DETAILS_ITEM_COUNT,
} from './compare-details.model';
import {
  describeCompareDetailsItem,
  filterCompareDetails,
  groupCompareDetailsByStatus,
  pickCompareDetailsHighlights,
  sortCompareDetails,
  totalCompareDetails,
  compareDetailsStatusTone,
} from './compare-details.utils';

describe('compare-details utils', () => {
  const items = buildCompareDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareDetails(items, '')).toHaveLength(items.length);
    expect(
      filterCompareDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareDetails(items, 'amount', 'asc');
    const desc = sortCompareDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareDetailsStatusTone('active')).toBe('success');
    expect(compareDetailsStatusTone('pending')).toBe('warning');
    expect(compareDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
