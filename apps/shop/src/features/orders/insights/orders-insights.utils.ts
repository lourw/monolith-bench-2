import { validateDate } from '../../../utils/validate/validate-date';
import {
  emptyOrdersInsightsTotals,
  type OrdersInsightsItem,
  type OrdersInsightsStatus,
  type OrdersInsightsTotals,
} from './orders-insights.model';

export type OrdersInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersInsights(
  items: ReadonlyArray<OrdersInsightsItem>,
): OrdersInsightsTotals {
  const totals = emptyOrdersInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersInsightsByStatus(
  items: ReadonlyArray<OrdersInsightsItem>,
): Record<OrdersInsightsStatus, OrdersInsightsItem[]> {
  const grouped: Record<OrdersInsightsStatus, OrdersInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersInsights(
  items: ReadonlyArray<OrdersInsightsItem>,
  query: string,
): OrdersInsightsItem[] {
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

export function sortOrdersInsights(
  items: ReadonlyArray<OrdersInsightsItem>,
  key: OrdersInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersInsightsItem[] {
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

export function describeOrdersInsightsItem(item: OrdersInsightsItem): string {
  const amount = validateDate(item.amount);
  const name = validateDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersInsightsAmount(amount: number): string {
  return validateDate(amount);
}

export function ordersInsightsStatusTone(
  status: OrdersInsightsStatus,
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

export function pickOrdersInsightsHighlights(
  items: ReadonlyArray<OrdersInsightsItem>,
  limit = 3,
): OrdersInsightsItem[] {
  return sortOrdersInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
