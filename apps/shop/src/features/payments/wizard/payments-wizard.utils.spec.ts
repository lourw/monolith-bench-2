import { describe, expect, it } from 'vitest';
import {
  buildPaymentsWizardItems,
  PAYMENTS_WIZARD_ITEM_COUNT,
} from './payments-wizard.model';
import {
  describePaymentsWizardItem,
  filterPaymentsWizard,
  groupPaymentsWizardByStatus,
  pickPaymentsWizardHighlights,
  sortPaymentsWizard,
  totalPaymentsWizard,
  paymentsWizardStatusTone,
} from './payments-wizard.utils';

describe('payments-wizard utils', () => {
  const items = buildPaymentsWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(PAYMENTS_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      PAYMENTS_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalPaymentsWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupPaymentsWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterPaymentsWizard(items, '')).toHaveLength(items.length);
    expect(
      filterPaymentsWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterPaymentsWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortPaymentsWizard(items, 'amount', 'asc');
    const desc = sortPaymentsWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describePaymentsWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(paymentsWizardStatusTone('active')).toBe('success');
    expect(paymentsWizardStatusTone('pending')).toBe('warning');
    expect(paymentsWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickPaymentsWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickPaymentsWizardHighlights(items, 0)).toHaveLength(0);
  });
});
