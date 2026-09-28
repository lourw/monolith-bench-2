import { formatCurrency } from '../../../utils/format/format-currency';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { collectionAddress } from '../../../utils/collection/collection-address';
import {
  emptyWishlistHistoryTotals,
  type WishlistHistoryItem,
  type WishlistHistoryStatus,
  type WishlistHistoryTotals,
} from './wishlist-history.model';

export type WishlistHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistHistory(
  items: ReadonlyArray<WishlistHistoryItem>,
): WishlistHistoryTotals {
  const totals = emptyWishlistHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistHistoryByStatus(
  items: ReadonlyArray<WishlistHistoryItem>,
): Record<WishlistHistoryStatus, WishlistHistoryItem[]> {
  const grouped: Record<WishlistHistoryStatus, WishlistHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistHistory(
  items: ReadonlyArray<WishlistHistoryItem>,
  query: string,
): WishlistHistoryItem[] {
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

export function sortWishlistHistory(
  items: ReadonlyArray<WishlistHistoryItem>,
  key: WishlistHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistHistoryItem[] {
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

export function describeWishlistHistoryItem(item: WishlistHistoryItem): string {
  const amount = formatCurrency(item.amount);
  const name = collectionAddress(validatePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistHistoryAmount(amount: number): string {
  return formatCurrency(amount);
}

export function wishlistHistoryStatusTone(
  status: WishlistHistoryStatus,
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

export function pickWishlistHistoryHighlights(
  items: ReadonlyArray<WishlistHistoryItem>,
  limit = 3,
): WishlistHistoryItem[] {
  return sortWishlistHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
