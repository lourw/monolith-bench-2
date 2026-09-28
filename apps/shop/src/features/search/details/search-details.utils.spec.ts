import { describe, expect, it } from 'vitest';
import {
  buildSearchDetailsItems,
  SEARCH_DETAILS_ITEM_COUNT,
} from './search-details.model';
import {
  describeSearchDetailsItem,
  filterSearchDetails,
  groupSearchDetailsByStatus,
  pickSearchDetailsHighlights,
  sortSearchDetails,
  totalSearchDetails,
  searchDetailsStatusTone,
} from './search-details.utils';

describe('search-details utils', () => {
  const items = buildSearchDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SEARCH_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SEARCH_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSearchDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSearchDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSearchDetails(items, '')).toHaveLength(items.length);
    expect(
      filterSearchDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSearchDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSearchDetails(items, 'amount', 'asc');
    const desc = sortSearchDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSearchDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(searchDetailsStatusTone('active')).toBe('success');
    expect(searchDetailsStatusTone('pending')).toBe('warning');
    expect(searchDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSearchDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickSearchDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
