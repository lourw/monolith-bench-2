import { collectionSlug } from '../../../utils/collection/collection-slug';
import {
  emptyNotificationsSummaryTotals,
  type NotificationsSummaryItem,
  type NotificationsSummaryStatus,
  type NotificationsSummaryTotals,
} from './notifications-summary.model';

export type NotificationsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsSummary(
  items: ReadonlyArray<NotificationsSummaryItem>,
): NotificationsSummaryTotals {
  const totals = emptyNotificationsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsSummaryByStatus(
  items: ReadonlyArray<NotificationsSummaryItem>,
): Record<NotificationsSummaryStatus, NotificationsSummaryItem[]> {
  const grouped: Record<
    NotificationsSummaryStatus,
    NotificationsSummaryItem[]
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

export function filterNotificationsSummary(
  items: ReadonlyArray<NotificationsSummaryItem>,
  query: string,
): NotificationsSummaryItem[] {
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

export function sortNotificationsSummary(
  items: ReadonlyArray<NotificationsSummaryItem>,
  key: NotificationsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsSummaryItem[] {
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

export function describeNotificationsSummaryItem(
  item: NotificationsSummaryItem,
): string {
  const amount = collectionSlug(item.amount);
  const name = collectionSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsSummaryAmount(amount: number): string {
  return collectionSlug(amount);
}

export function notificationsSummaryStatusTone(
  status: NotificationsSummaryStatus,
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

export function pickNotificationsSummaryHighlights(
  items: ReadonlyArray<NotificationsSummaryItem>,
  limit = 3,
): NotificationsSummaryItem[] {
  return sortNotificationsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
