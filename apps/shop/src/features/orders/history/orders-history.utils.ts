import { collectionDate } from '../../../utils/collection/collection-date';
import { storageCurrency } from '../../../utils/storage/storage-currency';
import { asyncName } from '../../../utils/async/async-name';
import {
  emptyOrdersHistoryTotals,
  type OrdersHistoryItem,
  type OrdersHistoryStatus,
  type OrdersHistoryTotals,
} from './orders-history.model';

export type OrdersHistorySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersHistory(
  items: ReadonlyArray<OrdersHistoryItem>,
): OrdersHistoryTotals {
  const totals = emptyOrdersHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersHistoryByStatus(
  items: ReadonlyArray<OrdersHistoryItem>,
): Record<OrdersHistoryStatus, OrdersHistoryItem[]> {
  const grouped: Record<OrdersHistoryStatus, OrdersHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersHistory(
  items: ReadonlyArray<OrdersHistoryItem>,
  query: string,
): OrdersHistoryItem[] {
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

export function sortOrdersHistory(
  items: ReadonlyArray<OrdersHistoryItem>,
  key: OrdersHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersHistoryItem[] {
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

export function describeOrdersHistoryItem(item: OrdersHistoryItem): string {
  const amount = collectionDate(item.amount);
  const name = asyncName(storageCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersHistoryAmount(amount: number): string {
  return collectionDate(amount);
}

export function ordersHistoryStatusTone(
  status: OrdersHistoryStatus,
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

export function pickOrdersHistoryHighlights(
  items: ReadonlyArray<OrdersHistoryItem>,
  limit = 3,
): OrdersHistoryItem[] {
  return sortOrdersHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
