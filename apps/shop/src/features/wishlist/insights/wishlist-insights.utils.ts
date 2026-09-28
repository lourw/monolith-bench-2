import { collectionPercent } from '../../../utils/collection/collection-percent';
import { formatAddress } from '../../../utils/format/format-address';
import {
  emptyWishlistInsightsTotals,
  type WishlistInsightsItem,
  type WishlistInsightsStatus,
  type WishlistInsightsTotals,
} from './wishlist-insights.model';

export type WishlistInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistInsights(
  items: ReadonlyArray<WishlistInsightsItem>,
): WishlistInsightsTotals {
  const totals = emptyWishlistInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistInsightsByStatus(
  items: ReadonlyArray<WishlistInsightsItem>,
): Record<WishlistInsightsStatus, WishlistInsightsItem[]> {
  const grouped: Record<WishlistInsightsStatus, WishlistInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistInsights(
  items: ReadonlyArray<WishlistInsightsItem>,
  query: string,
): WishlistInsightsItem[] {
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

export function sortWishlistInsights(
  items: ReadonlyArray<WishlistInsightsItem>,
  key: WishlistInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistInsightsItem[] {
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

export function describeWishlistInsightsItem(
  item: WishlistInsightsItem,
): string {
  const amount = collectionPercent(item.amount);
  const name = formatAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistInsightsAmount(amount: number): string {
  return collectionPercent(amount);
}

export function wishlistInsightsStatusTone(
  status: WishlistInsightsStatus,
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

export function pickWishlistInsightsHighlights(
  items: ReadonlyArray<WishlistInsightsItem>,
  limit = 3,
): WishlistInsightsItem[] {
  return sortWishlistInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
