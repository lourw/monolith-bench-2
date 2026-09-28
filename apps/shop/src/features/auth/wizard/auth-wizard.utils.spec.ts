import { describe, expect, it } from 'vitest';
import {
  buildAuthWizardItems,
  AUTH_WIZARD_ITEM_COUNT,
} from './auth-wizard.model';
import {
  describeAuthWizardItem,
  filterAuthWizard,
  groupAuthWizardByStatus,
  pickAuthWizardHighlights,
  sortAuthWizard,
  totalAuthWizard,
  authWizardStatusTone,
} from './auth-wizard.utils';

describe('auth-wizard utils', () => {
  const items = buildAuthWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(AUTH_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      AUTH_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAuthWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAuthWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAuthWizard(items, '')).toHaveLength(items.length);
    expect(
      filterAuthWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAuthWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAuthWizard(items, 'amount', 'asc');
    const desc = sortAuthWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAuthWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(authWizardStatusTone('active')).toBe('success');
    expect(authWizardStatusTone('pending')).toBe('warning');
    expect(authWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAuthWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickAuthWizardHighlights(items, 0)).toHaveLength(0);
  });
});
