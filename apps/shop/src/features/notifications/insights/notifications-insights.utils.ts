import { mathName } from '../../../utils/math/math-name';
import { mathNumber } from '../../../utils/math/math-number';
import { i18nNumber } from '../../../utils/i18n/i18n-number';
import {
  emptyNotificationsInsightsTotals,
  type NotificationsInsightsItem,
  type NotificationsInsightsStatus,
  type NotificationsInsightsTotals,
} from './notifications-insights.model';

export type NotificationsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsInsights(
  items: ReadonlyArray<NotificationsInsightsItem>,
): NotificationsInsightsTotals {
  const totals = emptyNotificationsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsInsightsByStatus(
  items: ReadonlyArray<NotificationsInsightsItem>,
): Record<NotificationsInsightsStatus, NotificationsInsightsItem[]> {
  const grouped: Record<
    NotificationsInsightsStatus,
    NotificationsInsightsItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterNotificationsInsights(
  items: ReadonlyArray<NotificationsInsightsItem>,
  query: string,
): NotificationsInsightsItem[] {
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

export function sortNotificationsInsights(
  items: ReadonlyArray<NotificationsInsightsItem>,
  key: NotificationsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsInsightsItem[] {
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

export function describeNotificationsInsightsItem(
  item: NotificationsInsightsItem,
): string {
  const amount = mathName(item.amount);
  const name = i18nNumber(mathNumber(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsInsightsAmount(amount: number): string {
  return mathName(amount);
}

export function notificationsInsightsStatusTone(
  status: NotificationsInsightsStatus,
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

export function pickNotificationsInsightsHighlights(
  items: ReadonlyArray<NotificationsInsightsItem>,
  limit = 3,
): NotificationsInsightsItem[] {
  return sortNotificationsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
