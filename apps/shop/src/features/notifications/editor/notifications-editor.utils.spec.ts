import { describe, expect, it } from 'vitest';
import {
  buildNotificationsEditorItems,
  NOTIFICATIONS_EDITOR_ITEM_COUNT,
} from './notifications-editor.model';
import {
  describeNotificationsEditorItem,
  filterNotificationsEditor,
  groupNotificationsEditorByStatus,
  pickNotificationsEditorHighlights,
  sortNotificationsEditor,
  totalNotificationsEditor,
  notificationsEditorStatusTone,
} from './notifications-editor.utils';

describe('notifications-editor utils', () => {
  const items = buildNotificationsEditorItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(NOTIFICATIONS_EDITOR_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      NOTIFICATIONS_EDITOR_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalNotificationsEditor(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupNotificationsEditorByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterNotificationsEditor(items, '')).toHaveLength(items.length);
    expect(
      filterNotificationsEditor(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterNotificationsEditor(items, 'no-such-thing-xyz')).toHaveLength(
      0,
    );
  });

  it('sorts by key in both directions', () => {
    const asc = sortNotificationsEditor(items, 'amount', 'asc');
    const desc = sortNotificationsEditor(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeNotificationsEditorItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(notificationsEditorStatusTone('active')).toBe('success');
    expect(notificationsEditorStatusTone('pending')).toBe('warning');
    expect(notificationsEditorStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickNotificationsEditorHighlights(items, 2)).toHaveLength(2);
    expect(pickNotificationsEditorHighlights(items, 0)).toHaveLength(0);
  });
});
