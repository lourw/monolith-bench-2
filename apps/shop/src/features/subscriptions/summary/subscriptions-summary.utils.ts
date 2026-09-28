import { formatCurrency } from '../../../utils/format/format-currency';
import { storageSlug } from '../../../utils/storage/storage-slug';
import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptySubscriptionsSummaryTotals,
  type SubscriptionsSummaryItem,
  type SubscriptionsSummaryStatus,
  type SubscriptionsSummaryTotals,
} from './subscriptions-summary.model';

export type SubscriptionsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsSummary(
  items: ReadonlyArray<SubscriptionsSummaryItem>,
): SubscriptionsSummaryTotals {
  const totals = emptySubscriptionsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsSummaryByStatus(
  items: ReadonlyArray<SubscriptionsSummaryItem>,
): Record<SubscriptionsSummaryStatus, SubscriptionsSummaryItem[]> {
  const grouped: Record<
    SubscriptionsSummaryStatus,
    SubscriptionsSummaryItem[]
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

export function filterSubscriptionsSummary(
  items: ReadonlyArray<SubscriptionsSummaryItem>,
  query: string,
): SubscriptionsSummaryItem[] {
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

export function sortSubscriptionsSummary(
  items: ReadonlyArray<SubscriptionsSummaryItem>,
  key: SubscriptionsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsSummaryItem[] {
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

export function describeSubscriptionsSummaryItem(
  item: SubscriptionsSummaryItem,
): string {
  const amount = formatCurrency(item.amount);
  const name = storageAddress(storageSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsSummaryAmount(amount: number): string {
  return formatCurrency(amount);
}

export function subscriptionsSummaryStatusTone(
  status: SubscriptionsSummaryStatus,
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

export function pickSubscriptionsSummaryHighlights(
  items: ReadonlyArray<SubscriptionsSummaryItem>,
  limit = 3,
): SubscriptionsSummaryItem[] {
  return sortSubscriptionsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
