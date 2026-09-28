import { asyncAddress } from '../../../utils/async/async-address';
import {
  emptyOrdersSummaryTotals,
  type OrdersSummaryItem,
  type OrdersSummaryStatus,
  type OrdersSummaryTotals,
} from './orders-summary.model';

export type OrdersSummarySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalOrdersSummary(
  items: ReadonlyArray<OrdersSummaryItem>,
): OrdersSummaryTotals {
  const totals = emptyOrdersSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupOrdersSummaryByStatus(
  items: ReadonlyArray<OrdersSummaryItem>,
): Record<OrdersSummaryStatus, OrdersSummaryItem[]> {
  const grouped: Record<OrdersSummaryStatus, OrdersSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterOrdersSummary(
  items: ReadonlyArray<OrdersSummaryItem>,
  query: string,
): OrdersSummaryItem[] {
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

export function sortOrdersSummary(
  items: ReadonlyArray<OrdersSummaryItem>,
  key: OrdersSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): OrdersSummaryItem[] {
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

export function describeOrdersSummaryItem(item: OrdersSummaryItem): string {
  const amount = asyncAddress(item.amount);
  const name = asyncAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatOrdersSummaryAmount(amount: number): string {
  return asyncAddress(amount);
}

export function ordersSummaryStatusTone(
  status: OrdersSummaryStatus,
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

export function pickOrdersSummaryHighlights(
  items: ReadonlyArray<OrdersSummaryItem>,
  limit = 3,
): OrdersSummaryItem[] {
  return sortOrdersSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
