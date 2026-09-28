import { asyncPercent } from '../../../utils/async/async-percent';
import { mathName } from '../../../utils/math/math-name';
import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptyWishlistSummaryTotals,
  type WishlistSummaryItem,
  type WishlistSummaryStatus,
  type WishlistSummaryTotals,
} from './wishlist-summary.model';

export type WishlistSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistSummary(
  items: ReadonlyArray<WishlistSummaryItem>,
): WishlistSummaryTotals {
  const totals = emptyWishlistSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistSummaryByStatus(
  items: ReadonlyArray<WishlistSummaryItem>,
): Record<WishlistSummaryStatus, WishlistSummaryItem[]> {
  const grouped: Record<WishlistSummaryStatus, WishlistSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistSummary(
  items: ReadonlyArray<WishlistSummaryItem>,
  query: string,
): WishlistSummaryItem[] {
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

export function sortWishlistSummary(
  items: ReadonlyArray<WishlistSummaryItem>,
  key: WishlistSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistSummaryItem[] {
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

export function describeWishlistSummaryItem(item: WishlistSummaryItem): string {
  const amount = asyncPercent(item.amount);
  const name = mathCurrency(mathName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistSummaryAmount(amount: number): string {
  return asyncPercent(amount);
}

export function wishlistSummaryStatusTone(
  status: WishlistSummaryStatus,
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

export function pickWishlistSummaryHighlights(
  items: ReadonlyArray<WishlistSummaryItem>,
  limit = 3,
): WishlistSummaryItem[] {
  return sortWishlistSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
