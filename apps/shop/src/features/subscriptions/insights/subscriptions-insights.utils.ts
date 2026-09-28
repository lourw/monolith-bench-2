import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { i18nText } from '../../../utils/i18n/i18n-text';
import {
  emptySubscriptionsInsightsTotals,
  type SubscriptionsInsightsItem,
  type SubscriptionsInsightsStatus,
  type SubscriptionsInsightsTotals,
} from './subscriptions-insights.model';

export type SubscriptionsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsInsights(
  items: ReadonlyArray<SubscriptionsInsightsItem>,
): SubscriptionsInsightsTotals {
  const totals = emptySubscriptionsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsInsightsByStatus(
  items: ReadonlyArray<SubscriptionsInsightsItem>,
): Record<SubscriptionsInsightsStatus, SubscriptionsInsightsItem[]> {
  const grouped: Record<
    SubscriptionsInsightsStatus,
    SubscriptionsInsightsItem[]
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

export function filterSubscriptionsInsights(
  items: ReadonlyArray<SubscriptionsInsightsItem>,
  query: string,
): SubscriptionsInsightsItem[] {
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

export function sortSubscriptionsInsights(
  items: ReadonlyArray<SubscriptionsInsightsItem>,
  key: SubscriptionsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsInsightsItem[] {
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

export function describeSubscriptionsInsightsItem(
  item: SubscriptionsInsightsItem,
): string {
  const amount = collectionCurrency(item.amount);
  const name = i18nText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsInsightsAmount(amount: number): string {
  return collectionCurrency(amount);
}

export function subscriptionsInsightsStatusTone(
  status: SubscriptionsInsightsStatus,
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

export function pickSubscriptionsInsightsHighlights(
  items: ReadonlyArray<SubscriptionsInsightsItem>,
  limit = 3,
): SubscriptionsInsightsItem[] {
  return sortSubscriptionsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
