import { asyncName } from '../../../utils/async/async-name';
import { storageText } from '../../../utils/storage/storage-text';
import {
  emptyCompareInsightsTotals,
  type CompareInsightsItem,
  type CompareInsightsStatus,
  type CompareInsightsTotals,
} from './compare-insights.model';

export type CompareInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareInsights(
  items: ReadonlyArray<CompareInsightsItem>,
): CompareInsightsTotals {
  const totals = emptyCompareInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareInsightsByStatus(
  items: ReadonlyArray<CompareInsightsItem>,
): Record<CompareInsightsStatus, CompareInsightsItem[]> {
  const grouped: Record<CompareInsightsStatus, CompareInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareInsights(
  items: ReadonlyArray<CompareInsightsItem>,
  query: string,
): CompareInsightsItem[] {
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

export function sortCompareInsights(
  items: ReadonlyArray<CompareInsightsItem>,
  key: CompareInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareInsightsItem[] {
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

export function describeCompareInsightsItem(item: CompareInsightsItem): string {
  const amount = asyncName(item.amount);
  const name = storageText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareInsightsAmount(amount: number): string {
  return asyncName(amount);
}

export function compareInsightsStatusTone(
  status: CompareInsightsStatus,
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

export function pickCompareInsightsHighlights(
  items: ReadonlyArray<CompareInsightsItem>,
  limit = 3,
): CompareInsightsItem[] {
  return sortCompareInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
