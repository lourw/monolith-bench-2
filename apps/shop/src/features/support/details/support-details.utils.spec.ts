import { describe, expect, it } from 'vitest';
import {
  buildSupportDetailsItems,
  SUPPORT_DETAILS_ITEM_COUNT,
} from './support-details.model';
import {
  describeSupportDetailsItem,
  filterSupportDetails,
  groupSupportDetailsByStatus,
  pickSupportDetailsHighlights,
  sortSupportDetails,
  totalSupportDetails,
  supportDetailsStatusTone,
} from './support-details.utils';

describe('support-details utils', () => {
  const items = buildSupportDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportDetails(items, '')).toHaveLength(items.length);
    expect(
      filterSupportDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportDetails(items, 'amount', 'asc');
    const desc = sortSupportDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportDetailsStatusTone('active')).toBe('success');
    expect(supportDetailsStatusTone('pending')).toBe('warning');
    expect(supportDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
