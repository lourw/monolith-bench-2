import { mathPercent } from '../../../utils/math/math-percent';
import { formatNumber } from '../../../utils/format/format-number';
import {
  emptyFeedbackSettingsTotals,
  type FeedbackSettingsItem,
  type FeedbackSettingsStatus,
  type FeedbackSettingsTotals,
} from './feedback-settings.model';

export type FeedbackSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackSettings(
  items: ReadonlyArray<FeedbackSettingsItem>,
): FeedbackSettingsTotals {
  const totals = emptyFeedbackSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackSettingsByStatus(
  items: ReadonlyArray<FeedbackSettingsItem>,
): Record<FeedbackSettingsStatus, FeedbackSettingsItem[]> {
  const grouped: Record<FeedbackSettingsStatus, FeedbackSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackSettings(
  items: ReadonlyArray<FeedbackSettingsItem>,
  query: string,
): FeedbackSettingsItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return Array.from(items);
  }
  return items.filter((item) => {
    if (item.name.toLowerCase().includes(needle)) {
      return true;
    }
    if (item.status.includes(needle)) {
      return true;
    }
    return item.tags.some((tag) => tag.includes(needle));
  });
}

export function sortFeedbackSettings(
  items: ReadonlyArray<FeedbackSettingsItem>,
  key: FeedbackSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackSettingsItem[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left === right) {
      return 0;
    }
    return left < right ? -factor : factor;
  });
}

export function describeFeedbackSettingsItem(
  item: FeedbackSettingsItem,
): string {
  const amount = mathPercent(item.amount);
  const name = formatNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackSettingsAmount(amount: number): string {
  return mathPercent(amount);
}

export function feedbackSettingsStatusTone(
  status: FeedbackSettingsStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function pickFeedbackSettingsHighlights(
  items: ReadonlyArray<FeedbackSettingsItem>,
  limit = 3,
): FeedbackSettingsItem[] {
  return sortFeedbackSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
