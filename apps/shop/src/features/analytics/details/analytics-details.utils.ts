import { mathCurrency } from '../../../utils/math/math-currency';
import { asyncText } from '../../../utils/async/async-text';
import {
  emptyAnalyticsDetailsTotals,
  type AnalyticsDetailsItem,
  type AnalyticsDetailsStatus,
  type AnalyticsDetailsTotals,
} from './analytics-details.model';

export type AnalyticsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsDetails(
  items: ReadonlyArray<AnalyticsDetailsItem>,
): AnalyticsDetailsTotals {
  const totals = emptyAnalyticsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsDetailsByStatus(
  items: ReadonlyArray<AnalyticsDetailsItem>,
): Record<AnalyticsDetailsStatus, AnalyticsDetailsItem[]> {
  const grouped: Record<AnalyticsDetailsStatus, AnalyticsDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsDetails(
  items: ReadonlyArray<AnalyticsDetailsItem>,
  query: string,
): AnalyticsDetailsItem[] {
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

export function sortAnalyticsDetails(
  items: ReadonlyArray<AnalyticsDetailsItem>,
  key: AnalyticsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsDetailsItem[] {
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

export function describeAnalyticsDetailsItem(
  item: AnalyticsDetailsItem,
): string {
  const amount = mathCurrency(item.amount);
  const name = asyncText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsDetailsAmount(amount: number): string {
  return mathCurrency(amount);
}

export function analyticsDetailsStatusTone(
  status: AnalyticsDetailsStatus,
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

export function pickAnalyticsDetailsHighlights(
  items: ReadonlyArray<AnalyticsDetailsItem>,
  limit = 3,
): AnalyticsDetailsItem[] {
  return sortAnalyticsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
