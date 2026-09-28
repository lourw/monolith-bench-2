import { describe, expect, it } from 'vitest';
import {
  buildAddressesEditorItems,
  ADDRESSES_EDITOR_ITEM_COUNT,
} from './addresses-editor.model';
import {
  describeAddressesEditorItem,
  filterAddressesEditor,
  groupAddressesEditorByStatus,
  pickAddressesEditorHighlights,
  sortAddressesEditor,
  totalAddressesEditor,
  addressesEditorStatusTone,
} from './addresses-editor.utils';

describe('addresses-editor utils', () => {
  const items = buildAddressesEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(ADDRESSES_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      ADDRESSES_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalAddressesEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupAddressesEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterAddressesEditor(items, '')).toHaveLength(items.length);
    expect(
      filterAddressesEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterAddressesEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortAddressesEditor(items, 'amount', 'asc');
    const desc = sortAddressesEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeAddressesEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(addressesEditorStatusTone('active')).toBe('success');
    expect(addressesEditorStatusTone('pending')).toBe('warning');
    expect(addressesEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickAddressesEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickAddressesEditorHighlights(items, 0)).toHaveLength(0);
  });
});
