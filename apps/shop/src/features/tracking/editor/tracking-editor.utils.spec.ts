import { describe, expect, it } from 'vitest';
import {
  buildTrackingEditorItems,
  TRACKING_EDITOR_ITEM_COUNT,
} from './tracking-editor.model';
import {
  describeTrackingEditorItem,
  filterTrackingEditor,
  groupTrackingEditorByStatus,
  pickTrackingEditorHighlights,
  sortTrackingEditor,
  totalTrackingEditor,
  trackingEditorStatusTone,
} from './tracking-editor.utils';

describe('tracking-editor utils', () => {
  const items = buildTrackingEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(TRACKING_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      TRACKING_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalTrackingEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupTrackingEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterTrackingEditor(items, '')).toHaveLength(items.length);
    expect(
      filterTrackingEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterTrackingEditor(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortTrackingEditor(items, 'amount', 'asc');
    const desc = sortTrackingEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeTrackingEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(trackingEditorStatusTone('active')).toBe('success');
    expect(trackingEditorStatusTone('pending')).toBe('warning');
    expect(trackingEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickTrackingEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickTrackingEditorHighlights(items, 0)).toHaveLength(0);
  });
});
