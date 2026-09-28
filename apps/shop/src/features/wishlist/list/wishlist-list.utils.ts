import { validateCurrency } from '../../../utils/validate/validate-currency';
import { collectionCurrency } from '../../../utils/collection/collection-currency';
import {
  emptyWishlistListTotals,
  type WishlistListItem,
  type WishlistListStatus,
  type WishlistListTotals,
} from './wishlist-list.model';

export type WishlistListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistList(
  items: ReadonlyArray<WishlistListItem>,
): WishlistListTotals {
  const totals = emptyWishlistListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistListByStatus(
  items: ReadonlyArray<WishlistListItem>,
): Record<WishlistListStatus, WishlistListItem[]> {
  const grouped: Record<WishlistListStatus, WishlistListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistList(
  items: ReadonlyArray<WishlistListItem>,
  query: string,
): WishlistListItem[] {
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

export function sortWishlistList(
  items: ReadonlyArray<WishlistListItem>,
  key: WishlistListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistListItem[] {
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

export function describeWishlistListItem(item: WishlistListItem): string {
  const amount = validateCurrency(item.amount);
  const name = collectionCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistListAmount(amount: number): string {
  return validateCurrency(amount);
}

export function wishlistListStatusTone(
  status: WishlistListStatus,
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

export function pickWishlistListHighlights(
  items: ReadonlyArray<WishlistListItem>,
  limit = 3,
): WishlistListItem[] {
  return sortWishlistList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
