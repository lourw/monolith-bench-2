import { i18nCurrency } from '../../../utils/i18n/i18n-currency';
import { asyncSlug } from '../../../utils/async/async-slug';
import {
  emptyShippingHistoryTotals,
  type ShippingHistoryItem,
  type ShippingHistoryStatus,
  type ShippingHistoryTotals,
} from './shipping-history.model';

export type ShippingHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingHistory(
  items: ReadonlyArray<ShippingHistoryItem>,
): ShippingHistoryTotals {
  const totals = emptyShippingHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingHistoryByStatus(
  items: ReadonlyArray<ShippingHistoryItem>,
): Record<ShippingHistoryStatus, ShippingHistoryItem[]> {
  const grouped: Record<ShippingHistoryStatus, ShippingHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingHistory(
  items: ReadonlyArray<ShippingHistoryItem>,
  query: string,
): ShippingHistoryItem[] {
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

export function sortShippingHistory(
  items: ReadonlyArray<ShippingHistoryItem>,
  key: ShippingHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingHistoryItem[] {
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

export function describeShippingHistoryItem(item: ShippingHistoryItem): string {
  const amount = i18nCurrency(item.amount);
  const name = asyncSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingHistoryAmount(amount: number): string {
  return i18nCurrency(amount);
}

export function shippingHistoryStatusTone(
  status: ShippingHistoryStatus,
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

export function pickShippingHistoryHighlights(
  items: ReadonlyArray<ShippingHistoryItem>,
  limit = 3,
): ShippingHistoryItem[] {
  return sortShippingHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
