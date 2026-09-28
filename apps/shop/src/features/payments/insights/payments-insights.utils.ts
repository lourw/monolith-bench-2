import { asyncCode } from '../../../utils/async/async-code';
import { mathText } from '../../../utils/math/math-text';
import {
  emptyPaymentsInsightsTotals,
  type PaymentsInsightsItem,
  type PaymentsInsightsStatus,
  type PaymentsInsightsTotals,
} from './payments-insights.model';

export type PaymentsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsInsights(
  items: ReadonlyArray<PaymentsInsightsItem>,
): PaymentsInsightsTotals {
  const totals = emptyPaymentsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsInsightsByStatus(
  items: ReadonlyArray<PaymentsInsightsItem>,
): Record<PaymentsInsightsStatus, PaymentsInsightsItem[]> {
  const grouped: Record<PaymentsInsightsStatus, PaymentsInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsInsights(
  items: ReadonlyArray<PaymentsInsightsItem>,
  query: string,
): PaymentsInsightsItem[] {
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

export function sortPaymentsInsights(
  items: ReadonlyArray<PaymentsInsightsItem>,
  key: PaymentsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsInsightsItem[] {
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

export function describePaymentsInsightsItem(
  item: PaymentsInsightsItem,
): string {
  const amount = asyncCode(item.amount);
  const name = mathText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsInsightsAmount(amount: number): string {
  return asyncCode(amount);
}

export function paymentsInsightsStatusTone(
  status: PaymentsInsightsStatus,
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

export function pickPaymentsInsightsHighlights(
  items: ReadonlyArray<PaymentsInsightsItem>,
  limit = 3,
): PaymentsInsightsItem[] {
  return sortPaymentsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
