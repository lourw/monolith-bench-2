import { mathName } from '../../../utils/math/math-name';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import {
  emptyReturnsInsightsTotals,
  type ReturnsInsightsItem,
  type ReturnsInsightsStatus,
  type ReturnsInsightsTotals,
} from './returns-insights.model';

export type ReturnsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsInsights(
  items: ReadonlyArray<ReturnsInsightsItem>,
): ReturnsInsightsTotals {
  const totals = emptyReturnsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsInsightsByStatus(
  items: ReadonlyArray<ReturnsInsightsItem>,
): Record<ReturnsInsightsStatus, ReturnsInsightsItem[]> {
  const grouped: Record<ReturnsInsightsStatus, ReturnsInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsInsights(
  items: ReadonlyArray<ReturnsInsightsItem>,
  query: string,
): ReturnsInsightsItem[] {
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

export function sortReturnsInsights(
  items: ReadonlyArray<ReturnsInsightsItem>,
  key: ReturnsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsInsightsItem[] {
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

export function describeReturnsInsightsItem(item: ReturnsInsightsItem): string {
  const amount = mathName(item.amount);
  const name = i18nCode(i18nDate(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsInsightsAmount(amount: number): string {
  return mathName(amount);
}

export function returnsInsightsStatusTone(
  status: ReturnsInsightsStatus,
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

export function pickReturnsInsightsHighlights(
  items: ReadonlyArray<ReturnsInsightsItem>,
  limit = 3,
): ReturnsInsightsItem[] {
  return sortReturnsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
