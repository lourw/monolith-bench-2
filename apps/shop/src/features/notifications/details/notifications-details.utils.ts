import { storagePhone } from '../../../utils/storage/storage-phone';
import { i18nName } from '../../../utils/i18n/i18n-name';
import {
  emptyNotificationsDetailsTotals,
  type NotificationsDetailsItem,
  type NotificationsDetailsStatus,
  type NotificationsDetailsTotals,
} from './notifications-details.model';

export type NotificationsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsDetails(
  items: ReadonlyArray<NotificationsDetailsItem>,
): NotificationsDetailsTotals {
  const totals = emptyNotificationsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsDetailsByStatus(
  items: ReadonlyArray<NotificationsDetailsItem>,
): Record<NotificationsDetailsStatus, NotificationsDetailsItem[]> {
  const grouped: Record<
    NotificationsDetailsStatus,
    NotificationsDetailsItem[]
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

export function filterNotificationsDetails(
  items: ReadonlyArray<NotificationsDetailsItem>,
  query: string,
): NotificationsDetailsItem[] {
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

export function sortNotificationsDetails(
  items: ReadonlyArray<NotificationsDetailsItem>,
  key: NotificationsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsDetailsItem[] {
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

export function describeNotificationsDetailsItem(
  item: NotificationsDetailsItem,
): string {
  const amount = storagePhone(item.amount);
  const name = i18nName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsDetailsAmount(amount: number): string {
  return storagePhone(amount);
}

export function notificationsDetailsStatusTone(
  status: NotificationsDetailsStatus,
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

export function pickNotificationsDetailsHighlights(
  items: ReadonlyArray<NotificationsDetailsItem>,
  limit = 3,
): NotificationsDetailsItem[] {
  return sortNotificationsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
