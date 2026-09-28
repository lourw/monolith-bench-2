import { describe, expect, it } from 'vitest';
import {
  buildBundlesSummaryItems,
  BUNDLES_SUMMARY_ITEM_COUNT,
} from './bundles-summary.model';
import {
  describeBundlesSummaryItem,
  filterBundlesSummary,
  groupBundlesSummaryByStatus,
  pickBundlesSummaryHighlights,
  sortBundlesSummary,
  totalBundlesSummary,
  bundlesSummaryStatusTone,
} from './bundles-summary.utils';

describe('bundles-summary utils', () => {
  const items = buildBundlesSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesSummary(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesSummary(items, 'amount', 'asc');
    const desc = sortBundlesSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesSummaryStatusTone('active')).toBe('success');
    expect(bundlesSummaryStatusTone('pending')).toBe('warning');
    expect(bundlesSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
