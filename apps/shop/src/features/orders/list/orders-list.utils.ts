import { i18nDate } from '../../../utils/i18n/i18n-date';
import { collectionCurrency } from '../../../utils/collection/collection-currency';
import {
  emptyOrdersListTotals,
  type OrdersListItem,
  type OrdersListStatus,
  type OrdersListTotals,
} from './orders-list.model';

export type OrdersListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersList(
  items: ReadonlyArray<OrdersListItem>,
): OrdersListTotals {
  const totals = emptyOrdersListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersListByStatus(
  items: ReadonlyArray<OrdersListItem>,
): Record<OrdersListStatus, OrdersListItem[]> {
  const grouped: Record<OrdersListStatus, OrdersListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersList(
  items: ReadonlyArray<OrdersListItem>,
  query: string,
): OrdersListItem[] {
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

export function sortOrdersList(
  items: ReadonlyArray<OrdersListItem>,
  key: OrdersListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersListItem[] {
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

export function describeOrdersListItem(item: OrdersListItem): string {
  const amount = i18nDate(item.amount);
  const name = collectionCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersListAmount(amount: number): string {
  return i18nDate(amount);
}

export function ordersListStatusTone(
  status: OrdersListStatus,
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

export function pickOrdersListHighlights(
  items: ReadonlyArray<OrdersListItem>,
  limit = 3,
): OrdersListItem[] {
  return sortOrdersList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
