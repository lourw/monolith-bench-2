import { collectionSlug } from '../../../utils/collection/collection-slug';
import {
  emptyNotificationsOverviewTotals,
  type NotificationsOverviewItem,
  type NotificationsOverviewStatus,
  type NotificationsOverviewTotals,
} from './notifications-overview.model';

export type NotificationsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsOverview(
  items: ReadonlyArray<NotificationsOverviewItem>,
): NotificationsOverviewTotals {
  const totals = emptyNotificationsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsOverviewByStatus(
  items: ReadonlyArray<NotificationsOverviewItem>,
): Record<NotificationsOverviewStatus, NotificationsOverviewItem[]> {
  const grouped: Record<
    NotificationsOverviewStatus,
    NotificationsOverviewItem[]
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

export function filterNotificationsOverview(
  items: ReadonlyArray<NotificationsOverviewItem>,
  query: string,
): NotificationsOverviewItem[] {
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

export function sortNotificationsOverview(
  items: ReadonlyArray<NotificationsOverviewItem>,
  key: NotificationsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsOverviewItem[] {
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

export function describeNotificationsOverviewItem(
  item: NotificationsOverviewItem,
): string {
  const amount = collectionSlug(item.amount);
  const name = collectionSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsOverviewAmount(amount: number): string {
  return collectionSlug(amount);
}

export function notificationsOverviewStatusTone(
  status: NotificationsOverviewStatus,
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

export function pickNotificationsOverviewHighlights(
  items: ReadonlyArray<NotificationsOverviewItem>,
  limit = 3,
): NotificationsOverviewItem[] {
  return sortNotificationsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
