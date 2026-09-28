import { formatText } from '../../../utils/format/format-text';
import { mathPercent } from '../../../utils/math/math-percent';
import {
  emptyOrdersOverviewTotals,
  type OrdersOverviewItem,
  type OrdersOverviewStatus,
  type OrdersOverviewTotals,
} from './orders-overview.model';

export type OrdersOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersOverview(
  items: ReadonlyArray<OrdersOverviewItem>,
): OrdersOverviewTotals {
  const totals = emptyOrdersOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersOverviewByStatus(
  items: ReadonlyArray<OrdersOverviewItem>,
): Record<OrdersOverviewStatus, OrdersOverviewItem[]> {
  const grouped: Record<OrdersOverviewStatus, OrdersOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersOverview(
  items: ReadonlyArray<OrdersOverviewItem>,
  query: string,
): OrdersOverviewItem[] {
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

export function sortOrdersOverview(
  items: ReadonlyArray<OrdersOverviewItem>,
  key: OrdersOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersOverviewItem[] {
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

export function describeOrdersOverviewItem(item: OrdersOverviewItem): string {
  const amount = formatText(item.amount);
  const name = mathPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersOverviewAmount(amount: number): string {
  return formatText(amount);
}

export function ordersOverviewStatusTone(
  status: OrdersOverviewStatus,
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

export function pickOrdersOverviewHighlights(
  items: ReadonlyArray<OrdersOverviewItem>,
  limit = 3,
): OrdersOverviewItem[] {
  return sortOrdersOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
