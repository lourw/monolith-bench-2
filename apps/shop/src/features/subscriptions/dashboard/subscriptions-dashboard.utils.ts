import { i18nName } from '../../../utils/i18n/i18n-name';
import { storageCode } from '../../../utils/storage/storage-code';
import {
  emptySubscriptionsDashboardTotals,
  type SubscriptionsDashboardItem,
  type SubscriptionsDashboardStatus,
  type SubscriptionsDashboardTotals,
} from './subscriptions-dashboard.model';

export type SubscriptionsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsDashboard(
  items: ReadonlyArray<SubscriptionsDashboardItem>,
): SubscriptionsDashboardTotals {
  const totals = emptySubscriptionsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsDashboardByStatus(
  items: ReadonlyArray<SubscriptionsDashboardItem>,
): Record<SubscriptionsDashboardStatus, SubscriptionsDashboardItem[]> {
  const grouped: Record<
    SubscriptionsDashboardStatus,
    SubscriptionsDashboardItem[]
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

export function filterSubscriptionsDashboard(
  items: ReadonlyArray<SubscriptionsDashboardItem>,
  query: string,
): SubscriptionsDashboardItem[] {
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

export function sortSubscriptionsDashboard(
  items: ReadonlyArray<SubscriptionsDashboardItem>,
  key: SubscriptionsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsDashboardItem[] {
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

export function describeSubscriptionsDashboardItem(
  item: SubscriptionsDashboardItem,
): string {
  const amount = i18nName(item.amount);
  const name = storageCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsDashboardAmount(amount: number): string {
  return i18nName(amount);
}

export function subscriptionsDashboardStatusTone(
  status: SubscriptionsDashboardStatus,
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

export function pickSubscriptionsDashboardHighlights(
  items: ReadonlyArray<SubscriptionsDashboardItem>,
  limit = 3,
): SubscriptionsDashboardItem[] {
  return sortSubscriptionsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
