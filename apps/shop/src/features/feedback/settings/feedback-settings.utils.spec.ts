import { describe, expect, it } from 'vitest';
import {
  buildFeedbackSettingsItems,
  FEEDBACK_SETTINGS_ITEM_COUNT,
} from './feedback-settings.model';
import {
  describeFeedbackSettingsItem,
  filterFeedbackSettings,
  groupFeedbackSettingsByStatus,
  pickFeedbackSettingsHighlights,
  sortFeedbackSettings,
  totalFeedbackSettings,
  feedbackSettingsStatusTone,
} from './feedback-settings.utils';

describe('feedback-settings utils', () => {
  const items = buildFeedbackSettingsItems();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(FEEDBACK_SETTINGS_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(
      FEEDBACK_SETTINGS_ITEM_COUNT,
    );
  });

  it('totals amounts and statuses', () => {
    const totals = totalFeedbackSettings(items);
    expect(totals.amount).toBe(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = groupFeedbackSettingsByStatus(items);
    const total =
      grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filterFeedbackSettings(items, '')).toHaveLength(items.length);
    expect(
      filterFeedbackSettings(items, 'active').every(
        (item) =>
          item.status === 'active' ||
          item.tags.some((t) => t.includes('active')) ||
          item.name.toLowerCase().includes('active'),
      ),
    ).toBe(true);
    expect(filterFeedbackSettings(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sortFeedbackSettings(items, 'amount', 'asc');
    const desc = sortFeedbackSettings(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describeFeedbackSettingsItem(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(feedbackSettingsStatusTone('active')).toBe('success');
    expect(feedbackSettingsStatusTone('pending')).toBe('warning');
    expect(feedbackSettingsStatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pickFeedbackSettingsHighlights(items, 2)).toHaveLength(2);
    expect(pickFeedbackSettingsHighlights(items, 0)).toHaveLength(0);
  });
});
