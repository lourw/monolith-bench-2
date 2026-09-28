import { mathDate } from '../../../utils/math/math-date';
import { collectionAddress } from '../../../utils/collection/collection-address';
import {
  emptyGiftCardsDashboardTotals,
  type GiftCardsDashboardItem,
  type GiftCardsDashboardStatus,
  type GiftCardsDashboardTotals,
} from './gift-cards-dashboard.model';

export type GiftCardsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsDashboard(
  items: ReadonlyArray<GiftCardsDashboardItem>,
): GiftCardsDashboardTotals {
  const totals = emptyGiftCardsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsDashboardByStatus(
  items: ReadonlyArray<GiftCardsDashboardItem>,
): Record<GiftCardsDashboardStatus, GiftCardsDashboardItem[]> {
  const grouped: Record<GiftCardsDashboardStatus, GiftCardsDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsDashboard(
  items: ReadonlyArray<GiftCardsDashboardItem>,
  query: string,
): GiftCardsDashboardItem[] {
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

export function sortGiftCardsDashboard(
  items: ReadonlyArray<GiftCardsDashboardItem>,
  key: GiftCardsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsDashboardItem[] {
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

export function describeGiftCardsDashboardItem(
  item: GiftCardsDashboardItem,
): string {
  const amount = mathDate(item.amount);
  const name = collectionAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsDashboardAmount(amount: number): string {
  return mathDate(amount);
}

export function giftCardsDashboardStatusTone(
  status: GiftCardsDashboardStatus,
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

export function pickGiftCardsDashboardHighlights(
  items: ReadonlyArray<GiftCardsDashboardItem>,
  limit = 3,
): GiftCardsDashboardItem[] {
  return sortGiftCardsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
