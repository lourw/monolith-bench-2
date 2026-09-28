import { describe, expect, it } from 'vitest';
import {
  buildStoreLocatorWizardItems,
  STORE_LOCATOR_WIZARD_ITEM_COUNT,
} from './store-locator-wizard.model';
import {
  describeStoreLocatorWizardItem,
  filterStoreLocatorWizard,
  groupStoreLocatorWizardByStatus,
  pickStoreLocatorWizardHighlights,
  sortStoreLocatorWizard,
  totalStoreLocatorWizard,
  storeLocatorWizardStatusTone,
} from './store-locator-wizard.utils';

describe('store-locator-wizard utils', () => {
  const items = buildStoreLocatorWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(STORE_LOCATOR_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      STORE_LOCATOR_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalStoreLocatorWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupStoreLocatorWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterStoreLocatorWizard(items, '')).toHaveLength(items.length);
    expect(
      filterStoreLocatorWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterStoreLocatorWizard(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortStoreLocatorWizard(items, 'amount', 'asc');
    const desc = sortStoreLocatorWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeStoreLocatorWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(storeLocatorWizardStatusTone('active')).toBe('success');
    expect(storeLocatorWizardStatusTone('pending')).toBe('warning');
    expect(storeLocatorWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickStoreLocatorWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickStoreLocatorWizardHighlights(items, 0)).toHaveLength(0);
  });
});
