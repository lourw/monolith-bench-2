import { validateAddress } from '../../../utils/validate/validate-address';
import { formatAddress } from '../../../utils/format/format-address';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import {
  emptyWishlistOverviewTotals,
  type WishlistOverviewItem,
  type WishlistOverviewStatus,
  type WishlistOverviewTotals,
} from './wishlist-overview.model';

export type WishlistOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistOverview(
  items: ReadonlyArray<WishlistOverviewItem>,
): WishlistOverviewTotals {
  const totals = emptyWishlistOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistOverviewByStatus(
  items: ReadonlyArray<WishlistOverviewItem>,
): Record<WishlistOverviewStatus, WishlistOverviewItem[]> {
  const grouped: Record<WishlistOverviewStatus, WishlistOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistOverview(
  items: ReadonlyArray<WishlistOverviewItem>,
  query: string,
): WishlistOverviewItem[] {
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

export function sortWishlistOverview(
  items: ReadonlyArray<WishlistOverviewItem>,
  key: WishlistOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistOverviewItem[] {
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

export function describeWishlistOverviewItem(
  item: WishlistOverviewItem,
): string {
  const amount = validateAddress(item.amount);
  const name = i18nCode(formatAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistOverviewAmount(amount: number): string {
  return validateAddress(amount);
}

export function wishlistOverviewStatusTone(
  status: WishlistOverviewStatus,
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

export function pickWishlistOverviewHighlights(
  items: ReadonlyArray<WishlistOverviewItem>,
  limit = 3,
): WishlistOverviewItem[] {
  return sortWishlistOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
