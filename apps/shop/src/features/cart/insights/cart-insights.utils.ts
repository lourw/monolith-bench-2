import { collectionSlug } from '../../../utils/collection/collection-slug';
import { collectionNumber } from '../../../utils/collection/collection-number';
import {
  emptyCartInsightsTotals,
  type CartInsightsItem,
  type CartInsightsStatus,
  type CartInsightsTotals,
} from './cart-insights.model';

export type CartInsightsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartInsights(
  items: ReadonlyArray<CartInsightsItem>,
): CartInsightsTotals {
  const totals = emptyCartInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartInsightsByStatus(
  items: ReadonlyArray<CartInsightsItem>,
): Record<CartInsightsStatus, CartInsightsItem[]> {
  const grouped: Record<CartInsightsStatus, CartInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartInsights(
  items: ReadonlyArray<CartInsightsItem>,
  query: string,
): CartInsightsItem[] {
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

export function sortCartInsights(
  items: ReadonlyArray<CartInsightsItem>,
  key: CartInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartInsightsItem[] {
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

export function describeCartInsightsItem(item: CartInsightsItem): string {
  const amount = collectionSlug(item.amount);
  const name = collectionNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartInsightsAmount(amount: number): string {
  return collectionSlug(amount);
}

export function cartInsightsStatusTone(
  status: CartInsightsStatus,
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

export function pickCartInsightsHighlights(
  items: ReadonlyArray<CartInsightsItem>,
  limit = 3,
): CartInsightsItem[] {
  return sortCartInsights(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
