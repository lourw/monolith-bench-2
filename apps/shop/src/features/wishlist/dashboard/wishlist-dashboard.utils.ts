import { asyncSlug } from '../../../utils/async/async-slug';
import { formatName } from '../../../utils/format/format-name';
import {
  emptyWishlistDashboardTotals,
  type WishlistDashboardItem,
  type WishlistDashboardStatus,
  type WishlistDashboardTotals,
} from './wishlist-dashboard.model';

export type WishlistDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistDashboard(
  items: ReadonlyArray<WishlistDashboardItem>,
): WishlistDashboardTotals {
  const totals = emptyWishlistDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistDashboardByStatus(
  items: ReadonlyArray<WishlistDashboardItem>,
): Record<WishlistDashboardStatus, WishlistDashboardItem[]> {
  const grouped: Record<WishlistDashboardStatus, WishlistDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistDashboard(
  items: ReadonlyArray<WishlistDashboardItem>,
  query: string,
): WishlistDashboardItem[] {
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

export function sortWishlistDashboard(
  items: ReadonlyArray<WishlistDashboardItem>,
  key: WishlistDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistDashboardItem[] {
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

export function describeWishlistDashboardItem(
  item: WishlistDashboardItem,
): string {
  const amount = asyncSlug(item.amount);
  const name = formatName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistDashboardAmount(amount: number): string {
  return asyncSlug(amount);
}

export function wishlistDashboardStatusTone(
  status: WishlistDashboardStatus,
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

export function pickWishlistDashboardHighlights(
  items: ReadonlyArray<WishlistDashboardItem>,
  limit = 3,
): WishlistDashboardItem[] {
  return sortWishlistDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
