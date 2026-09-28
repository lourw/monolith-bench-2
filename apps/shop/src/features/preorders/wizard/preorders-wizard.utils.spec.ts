import { describe, expect, it } from 'vitest';
import {
  buildPreordersWizardItems,
  PREORDERS_WIZARD_ITEM_COUNT,
} from './preorders-wizard.model';
import {
  describePreordersWizardItem,
  filterPreordersWizard,
  groupPreordersWizardByStatus,
  pickPreordersWizardHighlights,
  sortPreordersWizard,
  totalPreordersWizard,
  preordersWizardStatusTone,
} from './preorders-wizard.utils';

describe('preorders-wizard utils', () => {
  const items = buildPreordersWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PREORDERS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PREORDERS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPreordersWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPreordersWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPreordersWizard(items, '')).toHaveLength(items.length);
    expect(
      filterPreordersWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPreordersWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPreordersWizard(items, 'amount', 'asc');
    const desc = sortPreordersWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePreordersWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(preordersWizardStatusTone('active')).toBe('success');
    expect(preordersWizardStatusTone('pending')).toBe('warning');
    expect(preordersWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPreordersWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickPreordersWizardHighlights(items, 0)).toHaveLength(0);
  });
});
