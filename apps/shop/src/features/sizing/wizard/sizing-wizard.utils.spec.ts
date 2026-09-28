import { describe, expect, it } from 'vitest';
import {
  buildSizingWizardItems,
  SIZING_WIZARD_ITEM_COUNT,
} from './sizing-wizard.model';
import {
  describeSizingWizardItem,
  filterSizingWizard,
  groupSizingWizardByStatus,
  pickSizingWizardHighlights,
  sortSizingWizard,
  totalSizingWizard,
  sizingWizardStatusTone,
} from './sizing-wizard.utils';

describe('sizing-wizard utils', () => {
  const items = buildSizingWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(SIZING_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      SIZING_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalSizingWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupSizingWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterSizingWizard(items, '')).toHaveLength(items.length);
    expect(
      filterSizingWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterSizingWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortSizingWizard(items, 'amount', 'asc');
    const desc = sortSizingWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeSizingWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(sizingWizardStatusTone('active')).toBe('success');
    expect(sizingWizardStatusTone('pending')).toBe('warning');
    expect(sizingWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickSizingWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickSizingWizardHighlights(items, 0)).toHaveLength(0);
  });
});
