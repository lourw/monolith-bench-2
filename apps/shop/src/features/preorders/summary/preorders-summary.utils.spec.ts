import { describe, expect, it } from 'vitest';
import {
  buildPreordersSummaryItems,
  PREORDERS_SUMMARY_ITEM_COUNT,
} from './preorders-summary.model';
import {
  describePreordersSummaryItem,
  filterPreordersSummary,
  groupPreordersSummaryByStatus,
  pickPreordersSummaryHighlights,
  sortPreordersSummary,
  totalPreordersSummary,
  preordersSummaryStatusTone,
} from './preorders-summary.utils';

describe('preorders-summary utils', () => {
  const items = buildPreordersSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersSummary(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersSummary(items, 'amount', 'asc');
    const desc = sortPreordersSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersSummaryStatusTone('active')).toBe('success');
    expect(preordersSummaryStatusTone('pending')).toBe('warning');
    expect(preordersSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
