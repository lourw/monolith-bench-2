import { describe, expect, it } from 'vitest';
import {
  buildSupportSummaryItems,
  SUPPORT_SUMMARY_ITEM_COUNT,
} from './support-summary.model';
import {
  describeSupportSummaryItem,
  filterSupportSummary,
  groupSupportSummaryByStatus,
  pickSupportSummaryHighlights,
  sortSupportSummary,
  totalSupportSummary,
  supportSummaryStatusTone,
} from './support-summary.utils';

describe('support-summary utils', () => {
  const items = buildSupportSummaryItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SUPPORT_SUMMARY_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SUPPORT_SUMMARY_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSupportSummary(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSupportSummaryByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSupportSummary(items, '')).toHaveLength(items.length);
    expect(
      filterSupportSummary(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSupportSummary(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSupportSummary(items, 'amount', 'asc');
    const desc = sortSupportSummary(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSupportSummaryItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(supportSummaryStatusTone('active')).toBe('success');
    expect(supportSummaryStatusTone('pending')).toBe('warning');
    expect(supportSummaryStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSupportSummaryHighlights(items, 2)).toHaveLength(2);
    expect(pickSupportSummaryHighlights(items, 0)).toHaveLength(0);
  });
});
