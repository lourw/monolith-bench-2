import { validateCode } from '../../../utils/validate/validate-code';
import { validatePercent } from '../../../utils/validate/validate-percent';
import {
  emptyNotificationsDashboardTotals,
  type NotificationsDashboardItem,
  type NotificationsDashboardStatus,
  type NotificationsDashboardTotals,
} from './notifications-dashboard.model';

export type NotificationsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalNotificationsDashboard(
  items: ReadonlyArray<NotificationsDashboardItem>,
): NotificationsDashboardTotals {
  const totals = emptyNotificationsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupNotificationsDashboardByStatus(
  items: ReadonlyArray<NotificationsDashboardItem>,
): Record<NotificationsDashboardStatus, NotificationsDashboardItem[]> {
  const grouped: Record<
    NotificationsDashboardStatus,
    NotificationsDashboardItem[]
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

export function filterNotificationsDashboard(
  items: ReadonlyArray<NotificationsDashboardItem>,
  query: string,
): NotificationsDashboardItem[] {
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

export function sortNotificationsDashboard(
  items: ReadonlyArray<NotificationsDashboardItem>,
  key: NotificationsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): NotificationsDashboardItem[] {
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

export function describeNotificationsDashboardItem(
  item: NotificationsDashboardItem,
): string {
  const amount = validateCode(item.amount);
  const name = validatePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatNotificationsDashboardAmount(amount: number): string {
  return validateCode(amount);
}

export function notificationsDashboardStatusTone(
  status: NotificationsDashboardStatus,
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

export function pickNotificationsDashboardHighlights(
  items: ReadonlyArray<NotificationsDashboardItem>,
  limit = 3,
): NotificationsDashboardItem[] {
  return sortNotificationsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
