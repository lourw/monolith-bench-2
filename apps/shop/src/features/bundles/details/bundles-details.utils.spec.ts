import { describe, expect, it } from 'vitest';
import {
  buildBundlesDetailsItems,
  BUNDLES_DETAILS_ITEM_COUNT,
} from './bundles-details.model';
import {
  describeBundlesDetailsItem,
  filterBundlesDetails,
  groupBundlesDetailsByStatus,
  pickBundlesDetailsHighlights,
  sortBundlesDetails,
  totalBundlesDetails,
  bundlesDetailsStatusTone,
} from './bundles-details.utils';

describe('bundles-details utils', () => {
  const items = buildBundlesDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesDetails(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesDetails(items, 'amount', 'asc');
    const desc = sortBundlesDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesDetailsStatusTone('active')).toBe('success');
    expect(bundlesDetailsStatusTone('pending')).toBe('warning');
    expect(bundlesDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
