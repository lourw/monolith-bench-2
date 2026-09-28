import { describe, expect, it } from 'vitest';
import {
  buildBundlesWizardItems,
  BUNDLES_WIZARD_ITEM_COUNT,
} from './bundles-wizard.model';
import {
  describeBundlesWizardItem,
  filterBundlesWizard,
  groupBundlesWizardByStatus,
  pickBundlesWizardHighlights,
  sortBundlesWizard,
  totalBundlesWizard,
  bundlesWizardStatusTone,
} from './bundles-wizard.utils';

describe('bundles-wizard utils', () => {
  const items = buildBundlesWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(BUNDLES_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      BUNDLES_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalBundlesWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupBundlesWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterBundlesWizard(items, '')).toHaveLength(items.length);
    expect(
      filterBundlesWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterBundlesWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortBundlesWizard(items, 'amount', 'asc');
    const desc = sortBundlesWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeBundlesWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(bundlesWizardStatusTone('active')).toBe('success');
    expect(bundlesWizardStatusTone('pending')).toBe('warning');
    expect(bundlesWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickBundlesWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickBundlesWizardHighlights(items, 0)).toHaveLength(0);
  });
});
