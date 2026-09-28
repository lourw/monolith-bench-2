import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptyAddressesInsightsTotals,
  type AddressesInsightsItem,
  type AddressesInsightsStatus,
  type AddressesInsightsTotals,
} from './addresses-insights.model';

export type AddressesInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesInsights(
  items: ReadonlyArray<AddressesInsightsItem>,
): AddressesInsightsTotals {
  const totals = emptyAddressesInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesInsightsByStatus(
  items: ReadonlyArray<AddressesInsightsItem>,
): Record<AddressesInsightsStatus, AddressesInsightsItem[]> {
  const grouped: Record<AddressesInsightsStatus, AddressesInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesInsights(
  items: ReadonlyArray<AddressesInsightsItem>,
  query: string,
): AddressesInsightsItem[] {
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

export function sortAddressesInsights(
  items: ReadonlyArray<AddressesInsightsItem>,
  key: AddressesInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesInsightsItem[] {
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

export function describeAddressesInsightsItem(
  item: AddressesInsightsItem,
): string {
  const amount = mathCurrency(item.amount);
  const name = mathCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesInsightsAmount(amount: number): string {
  return mathCurrency(amount);
}

export function addressesInsightsStatusTone(
  status: AddressesInsightsStatus,
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

export function pickAddressesInsightsHighlights(
  items: ReadonlyArray<AddressesInsightsItem>,
  limit = 3,
): AddressesInsightsItem[] {
  return sortAddressesInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
