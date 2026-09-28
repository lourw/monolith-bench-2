import { describe, expect, it } from 'vitest';
import {
  buildPaymentsInsightsItems,
  PAYMENTS_INSIGHTS_ITEM_COUNT,
} from './payments-insights.model';
import {
  describePaymentsInsightsItem,
  filterPaymentsInsights,
  groupPaymentsInsightsByStatus,
  pickPaymentsInsightsHighlights,
  sortPaymentsInsights,
  totalPaymentsInsights,
  paymentsInsightsStatusTone,
} from './payments-insights.utils';

describe('payments-insights utils', () => {
  const items = buildPaymentsInsightsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_INSIGHTS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_INSIGHTS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsInsights(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsInsightsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsInsights(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsInsights(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsInsights(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsInsights(items, 'amount', 'asc');
    const desc = sortPaymentsInsights(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsInsightsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsInsightsStatusTone('active')).toBe('success');
    expect(paymentsInsightsStatusTone('pending')).toBe('warning');
    expect(paymentsInsightsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsInsightsHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsInsightsHighlights(items, 0)).toHaveLength(0);
  });
});
