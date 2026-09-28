import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { mathPhone } from '../../../utils/math/math-phone';
import {
  emptyNotificationsHistoryTotals,
  type NotificationsHistoryItem,
  type NotificationsHistoryStatus,
  type NotificationsHistoryTotals,
} from './notifications-history.model';

export type NotificationsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsHistory(
  items: ReadonlyArray<NotificationsHistoryItem>,
): NotificationsHistoryTotals {
  const totals = emptyNotificationsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsHistoryByStatus(
  items: ReadonlyArray<NotificationsHistoryItem>,
): Record<NotificationsHistoryStatus, NotificationsHistoryItem[]> {
  const grouped: Record<
    NotificationsHistoryStatus,
    NotificationsHistoryItem[]
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

export function filterNotificationsHistory(
  items: ReadonlyArray<NotificationsHistoryItem>,
  query: string,
): NotificationsHistoryItem[] {
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

export function sortNotificationsHistory(
  items: ReadonlyArray<NotificationsHistoryItem>,
  key: NotificationsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsHistoryItem[] {
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

export function describeNotificationsHistoryItem(
  item: NotificationsHistoryItem,
): string {
  const amount = i18nNumber(item.amount);
  const name = mathPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsHistoryAmount(amount: number): string {
  return i18nNumber(amount);
}

export function notificationsHistoryStatusTone(
  status: NotificationsHistoryStatus,
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

export function pickNotificationsHistoryHighlights(
  items: ReadonlyArray<NotificationsHistoryItem>,
  limit = 3,
): NotificationsHistoryItem[] {
  return sortNotificationsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
