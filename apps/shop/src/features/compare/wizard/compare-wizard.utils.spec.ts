import { describe, expect, it } from 'vitest';
import {
  buildCompareWizardItems,
  COMPARE_WIZARD_ITEM_COUNT,
} from './compare-wizard.model';
import {
  describeCompareWizardItem,
  filterCompareWizard,
  groupCompareWizardByStatus,
  pickCompareWizardHighlights,
  sortCompareWizard,
  totalCompareWizard,
  compareWizardStatusTone,
} from './compare-wizard.utils';

describe('compare-wizard utils', () => {
  const items = buildCompareWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(COMPARE_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      COMPARE_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalCompareWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupCompareWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterCompareWizard(items, '')).toHaveLength(items.length);
    expect(
      filterCompareWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterCompareWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortCompareWizard(items, 'amount', 'asc');
    const desc = sortCompareWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeCompareWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(compareWizardStatusTone('active')).toBe('success');
    expect(compareWizardStatusTone('pending')).toBe('warning');
    expect(compareWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickCompareWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickCompareWizardHighlights(items, 0)).toHaveLength(0);
  });
});
