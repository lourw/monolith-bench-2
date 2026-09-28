import { formatDate } from '../../../utils/format/format-date';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import {
  emptyOrdersDashboardTotals,
  type OrdersDashboardItem,
  type OrdersDashboardStatus,
  type OrdersDashboardTotals,
} from './orders-dashboard.model';

export type OrdersDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersDashboard(
  items: ReadonlyArray<OrdersDashboardItem>,
): OrdersDashboardTotals {
  const totals = emptyOrdersDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersDashboardByStatus(
  items: ReadonlyArray<OrdersDashboardItem>,
): Record<OrdersDashboardStatus, OrdersDashboardItem[]> {
  const grouped: Record<OrdersDashboardStatus, OrdersDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersDashboard(
  items: ReadonlyArray<OrdersDashboardItem>,
  query: string,
): OrdersDashboardItem[] {
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

export function sortOrdersDashboard(
  items: ReadonlyArray<OrdersDashboardItem>,
  key: OrdersDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersDashboardItem[] {
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

export function describeOrdersDashboardItem(item: OrdersDashboardItem): string {
  const amount = formatDate(item.amount);
  const name = i18nSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersDashboardAmount(amount: number): string {
  return formatDate(amount);
}

export function ordersDashboardStatusTone(
  status: OrdersDashboardStatus,
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

export function pickOrdersDashboardHighlights(
  items: ReadonlyArray<OrdersDashboardItem>,
  limit = 3,
): OrdersDashboardItem[] {
  return sortOrdersDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
