import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { mathName } from '../../../utils/math/math-name';
import {
  emptyNotificationsListTotals,
  type NotificationsListItem,
  type NotificationsListStatus,
  type NotificationsListTotals,
} from './notifications-list.model';

export type NotificationsListSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsList(
  items: ReadonlyArray<NotificationsListItem>,
): NotificationsListTotals {
  const totals = emptyNotificationsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsListByStatus(
  items: ReadonlyArray<NotificationsListItem>,
): Record<NotificationsListStatus, NotificationsListItem[]> {
  const grouped: Record<NotificationsListStatus, NotificationsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterNotificationsList(
  items: ReadonlyArray<NotificationsListItem>,
  query: string,
): NotificationsListItem[] {
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

export function sortNotificationsList(
  items: ReadonlyArray<NotificationsListItem>,
  key: NotificationsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsListItem[] {
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

export function describeNotificationsListItem(
  item: NotificationsListItem,
): string {
  const amount = collectionCurrency(item.amount);
  const name = mathName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsListAmount(amount: number): string {
  return collectionCurrency(amount);
}

export function notificationsListStatusTone(
  status: NotificationsListStatus,
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

export function pickNotificationsListHighlights(
  items: ReadonlyArray<NotificationsListItem>,
  limit = 3,
): NotificationsListItem[] {
  return sortNotificationsList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
