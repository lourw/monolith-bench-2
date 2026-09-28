import { formatCurrency } from '../../../utils/format/format-currency';
import { asyncPercent } from '../../../utils/async/async-percent';
import {
  emptyShippingInsightsTotals,
  type ShippingInsightsItem,
  type ShippingInsightsStatus,
  type ShippingInsightsTotals,
} from './shipping-insights.model';

export type ShippingInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingInsights(
  items: ReadonlyArray<ShippingInsightsItem>,
): ShippingInsightsTotals {
  const totals = emptyShippingInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingInsightsByStatus(
  items: ReadonlyArray<ShippingInsightsItem>,
): Record<ShippingInsightsStatus, ShippingInsightsItem[]> {
  const grouped: Record<ShippingInsightsStatus, ShippingInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingInsights(
  items: ReadonlyArray<ShippingInsightsItem>,
  query: string,
): ShippingInsightsItem[] {
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

export function sortShippingInsights(
  items: ReadonlyArray<ShippingInsightsItem>,
  key: ShippingInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingInsightsItem[] {
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

export function describeShippingInsightsItem(
  item: ShippingInsightsItem,
): string {
  const amount = formatCurrency(item.amount);
  const name = asyncPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingInsightsAmount(amount: number): string {
  return formatCurrency(amount);
}

export function shippingInsightsStatusTone(
  status: ShippingInsightsStatus,
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

export function pickShippingInsightsHighlights(
  items: ReadonlyArray<ShippingInsightsItem>,
  limit = 3,
): ShippingInsightsItem[] {
  return sortShippingInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
