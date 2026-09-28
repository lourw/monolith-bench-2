import { describe, expect, it } from 'vitest';
import {
  buildReturnsWizardItems,
  RETURNS_WIZARD_ITEM_COUNT,
} from './returns-wizard.model';
import {
  describeReturnsWizardItem,
  filterReturnsWizard,
  groupReturnsWizardByStatus,
  pickReturnsWizardHighlights,
  sortReturnsWizard,
  totalReturnsWizard,
  returnsWizardStatusTone,
} from './returns-wizard.utils';

describe('returns-wizard utils', () => {
  const items = buildReturnsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(RETURNS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      RETURNS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalReturnsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupReturnsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterReturnsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterReturnsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterReturnsWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortReturnsWizard(items, 'amount', 'asc');
    const desc = sortReturnsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeReturnsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(returnsWizardStatusTone('active')).toBe('success');
    expect(returnsWizardStatusTone('pending')).toBe('warning');
    expect(returnsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickReturnsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickReturnsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
