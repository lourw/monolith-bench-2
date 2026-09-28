import { mathCode } from '../../../utils/math/math-code';
import { asyncPercent } from '../../../utils/async/async-percent';
import { collectionSlug } from '../../../utils/collection/collection-slug';
import {
  emptyCheckoutInsightsTotals,
  type CheckoutInsightsItem,
  type CheckoutInsightsStatus,
  type CheckoutInsightsTotals,
} from './checkout-insights.model';

export type CheckoutInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutInsights(
  items: ReadonlyArray<CheckoutInsightsItem>,
): CheckoutInsightsTotals {
  const totals = emptyCheckoutInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutInsightsByStatus(
  items: ReadonlyArray<CheckoutInsightsItem>,
): Record<CheckoutInsightsStatus, CheckoutInsightsItem[]> {
  const grouped: Record<CheckoutInsightsStatus, CheckoutInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutInsights(
  items: ReadonlyArray<CheckoutInsightsItem>,
  query: string,
): CheckoutInsightsItem[] {
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

export function sortCheckoutInsights(
  items: ReadonlyArray<CheckoutInsightsItem>,
  key: CheckoutInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutInsightsItem[] {
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

export function describeCheckoutInsightsItem(
  item: CheckoutInsightsItem,
): string {
  const amount = mathCode(item.amount);
  const name = collectionSlug(asyncPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutInsightsAmount(amount: number): string {
  return mathCode(amount);
}

export function checkoutInsightsStatusTone(
  status: CheckoutInsightsStatus,
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

export function pickCheckoutInsightsHighlights(
  items: ReadonlyArray<CheckoutInsightsItem>,
  limit = 3,
): CheckoutInsightsItem[] {
  return sortCheckoutInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
