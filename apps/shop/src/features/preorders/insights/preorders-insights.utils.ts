import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyPreordersInsightsTotals,
  type PreordersInsightsItem,
  type PreordersInsightsStatus,
  type PreordersInsightsTotals,
} from './preorders-insights.model';

export type PreordersInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersInsights(
  items: ReadonlyArray<PreordersInsightsItem>,
): PreordersInsightsTotals {
  const totals = emptyPreordersInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersInsightsByStatus(
  items: ReadonlyArray<PreordersInsightsItem>,
): Record<PreordersInsightsStatus, PreordersInsightsItem[]> {
  const grouped: Record<PreordersInsightsStatus, PreordersInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersInsights(
  items: ReadonlyArray<PreordersInsightsItem>,
  query: string,
): PreordersInsightsItem[] {
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

export function sortPreordersInsights(
  items: ReadonlyArray<PreordersInsightsItem>,
  key: PreordersInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersInsightsItem[] {
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

export function describePreordersInsightsItem(
  item: PreordersInsightsItem,
): string {
  const amount = validateName(item.amount);
  const name = validateName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersInsightsAmount(amount: number): string {
  return validateName(amount);
}

export function preordersInsightsStatusTone(
  status: PreordersInsightsStatus,
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

export function pickPreordersInsightsHighlights(
  items: ReadonlyArray<PreordersInsightsItem>,
  limit = 3,
): PreordersInsightsItem[] {
  return sortPreordersInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
