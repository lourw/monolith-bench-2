import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import {
  emptyOrdersDetailsTotals,
  type OrdersDetailsItem,
  type OrdersDetailsStatus,
  type OrdersDetailsTotals,
} from './orders-details.model';

export type OrdersDetailsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersDetails(
  items: ReadonlyArray<OrdersDetailsItem>,
): OrdersDetailsTotals {
  const totals = emptyOrdersDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersDetailsByStatus(
  items: ReadonlyArray<OrdersDetailsItem>,
): Record<OrdersDetailsStatus, OrdersDetailsItem[]> {
  const grouped: Record<OrdersDetailsStatus, OrdersDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersDetails(
  items: ReadonlyArray<OrdersDetailsItem>,
  query: string,
): OrdersDetailsItem[] {
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

export function sortOrdersDetails(
  items: ReadonlyArray<OrdersDetailsItem>,
  key: OrdersDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersDetailsItem[] {
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

export function describeOrdersDetailsItem(item: OrdersDetailsItem): string {
  const amount = i18nAddress(item.amount);
  const name = i18nSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersDetailsAmount(amount: number): string {
  return i18nAddress(amount);
}

export function ordersDetailsStatusTone(
  status: OrdersDetailsStatus,
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

export function pickOrdersDetailsHighlights(
  items: ReadonlyArray<OrdersDetailsItem>,
  limit = 3,
): OrdersDetailsItem[] {
  return sortOrdersDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
