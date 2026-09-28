import { validateSlug } from '../../../utils/validate/validate-slug';
import {
  emptyWishlistDetailsTotals,
  type WishlistDetailsItem,
  type WishlistDetailsStatus,
  type WishlistDetailsTotals,
} from './wishlist-details.model';

export type WishlistDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistDetails(
  items: ReadonlyArray<WishlistDetailsItem>,
): WishlistDetailsTotals {
  const totals = emptyWishlistDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistDetailsByStatus(
  items: ReadonlyArray<WishlistDetailsItem>,
): Record<WishlistDetailsStatus, WishlistDetailsItem[]> {
  const grouped: Record<WishlistDetailsStatus, WishlistDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistDetails(
  items: ReadonlyArray<WishlistDetailsItem>,
  query: string,
): WishlistDetailsItem[] {
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

export function sortWishlistDetails(
  items: ReadonlyArray<WishlistDetailsItem>,
  key: WishlistDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistDetailsItem[] {
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

export function describeWishlistDetailsItem(item: WishlistDetailsItem): string {
  const amount = validateSlug(item.amount);
  const name = validateSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistDetailsAmount(amount: number): string {
  return validateSlug(amount);
}

export function wishlistDetailsStatusTone(
  status: WishlistDetailsStatus,
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

export function pickWishlistDetailsHighlights(
  items: ReadonlyArray<WishlistDetailsItem>,
  limit = 3,
): WishlistDetailsItem[] {
  return sortWishlistDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
