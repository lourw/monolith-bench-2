import { describe, expect, it } from 'vitest';
import {
  buildAnalyticsWizardItems,
  ANALYTICS_WIZARD_ITEM_COUNT,
} from './analytics-wizard.model';
import {
  describeAnalyticsWizardItem,
  filterAnalyticsWizard,
  groupAnalyticsWizardByStatus,
  pickAnalyticsWizardHighlights,
  sortAnalyticsWizard,
  totalAnalyticsWizard,
  analyticsWizardStatusTone,
} from './analytics-wizard.utils';

describe('analytics-wizard utils', () => {
  const items = buildAnalyticsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ANALYTICS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ANALYTICS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAnalyticsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAnalyticsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAnalyticsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterAnalyticsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAnalyticsWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAnalyticsWizard(items, 'amount', 'asc');
    const desc = sortAnalyticsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAnalyticsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(analyticsWizardStatusTone('active')).toBe('success');
    expect(analyticsWizardStatusTone('pending')).toBe('warning');
    expect(analyticsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAnalyticsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickAnalyticsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
