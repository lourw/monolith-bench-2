import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptySubscriptionsOverviewTotals,
  type SubscriptionsOverviewItem,
  type SubscriptionsOverviewStatus,
  type SubscriptionsOverviewTotals,
} from './subscriptions-overview.model';

export type SubscriptionsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsOverview(
  items: ReadonlyArray<SubscriptionsOverviewItem>,
): SubscriptionsOverviewTotals {
  const totals = emptySubscriptionsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsOverviewByStatus(
  items: ReadonlyArray<SubscriptionsOverviewItem>,
): Record<SubscriptionsOverviewStatus, SubscriptionsOverviewItem[]> {
  const grouped: Record<
    SubscriptionsOverviewStatus,
    SubscriptionsOverviewItem[]
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

export function filterSubscriptionsOverview(
  items: ReadonlyArray<SubscriptionsOverviewItem>,
  query: string,
): SubscriptionsOverviewItem[] {
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

export function sortSubscriptionsOverview(
  items: ReadonlyArray<SubscriptionsOverviewItem>,
  key: SubscriptionsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsOverviewItem[] {
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

export function describeSubscriptionsOverviewItem(
  item: SubscriptionsOverviewItem,
): string {
  const amount = storageAddress(item.amount);
  const name = storageAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsOverviewAmount(amount: number): string {
  return storageAddress(amount);
}

export function subscriptionsOverviewStatusTone(
  status: SubscriptionsOverviewStatus,
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

export function pickSubscriptionsOverviewHighlights(
  items: ReadonlyArray<SubscriptionsOverviewItem>,
  limit = 3,
): SubscriptionsOverviewItem[] {
  return sortSubscriptionsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
