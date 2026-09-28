import { describe, expect, it } from 'vitest';
import {
  buildBundlesListItems,
  BUNDLES_LIST_ITEM_COUNT,
} from './bundles-list.model';
import {
  describeBundlesListItem,
  filterBundlesList,
  groupBundlesListByStatus,
  pickBundlesListHighlights,
  sortBundlesList,
  totalBundlesList,
  bundlesListStatusTone,
} from './bundles-list.utils';

describe('bundles-list utils', () => {
  const items = buildBundlesListItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_LIST_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_LIST_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesList(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesListByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesList(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesList(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesList(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesList(items, 'amount', 'asc');
    const desc = sortBundlesList(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesListItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesListStatusTone('active')).toBe('success');
    expect(bundlesListStatusTone('pending')).toBe('warning');
    expect(bundlesListStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesListHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesListHighlights(items, 0)).toHaveLength(0);
  });
});
