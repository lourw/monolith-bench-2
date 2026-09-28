import { describe, expect, it } from 'vitest';
import {
  buildReturnsDetailsItems,
  RETURNS_DETAILS_ITEM_COUNT,
} from './returns-details.model';
import {
  describeReturnsDetailsItem,
  filterReturnsDetails,
  groupReturnsDetailsByStatus,
  pickReturnsDetailsHighlights,
  sortReturnsDetails,
  totalReturnsDetails,
  returnsDetailsStatusTone,
} from './returns-details.utils';

describe('returns-details utils', () => {
  const items = buildReturnsDetailsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_DETAILS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_DETAILS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsDetails(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsDetailsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsDetails(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsDetails(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsDetails(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsDetails(items, 'amount', 'asc');
    const desc = sortReturnsDetails(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsDetailsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsDetailsStatusTone('active')).toBe('success');
    expect(returnsDetailsStatusTone('pending')).toBe('warning');
    expect(returnsDetailsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsDetailsHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsDetailsHighlights(items, 0)).toHaveLength(0);
  });
});
