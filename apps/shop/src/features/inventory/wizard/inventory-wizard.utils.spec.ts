import { describe, expect, it } from 'vitest';
import {
  buildInventoryWizardItems,
  INVENTORY_WIZARD_ITEM_COUNT,
} from './inventory-wizard.model';
import {
  describeInventoryWizardItem,
  filterInventoryWizard,
  groupInventoryWizardByStatus,
  pickInventoryWizardHighlights,
  sortInventoryWizard,
  totalInventoryWizard,
  inventoryWizardStatusTone,
} from './inventory-wizard.utils';

describe('inventory-wizard utils', () => {
  const items = buildInventoryWizardItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(INVENTORY_WIZARD_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      INVENTORY_WIZARD_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalInventoryWizard(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupInventoryWizardByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterInventoryWizard(items, '')).toHaveLength(items.length);
    expect(
      filterInventoryWizard(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterInventoryWizard(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortInventoryWizard(items, 'amount', 'asc');
    const desc = sortInventoryWizard(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeInventoryWizardItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(inventoryWizardStatusTone('active')).toBe('success');
    expect(inventoryWizardStatusTone('pending')).toBe('warning');
    expect(inventoryWizardStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickInventoryWizardHighlights(items, 2)).toHaveLength(2);
    expect(pickInventoryWizardHighlights(items, 0)).toHaveLength(0);
  });
});
