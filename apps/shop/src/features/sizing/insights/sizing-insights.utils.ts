import { asyncText } from '../../../utils/async/async-text';
import { validateAddress } from '../../../utils/validate/validate-address';
import {
  emptySizingInsightsTotals,
  type SizingInsightsItem,
  type SizingInsightsStatus,
  type SizingInsightsTotals,
} from './sizing-insights.model';

export type SizingInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingInsights(
  items: ReadonlyArray<SizingInsightsItem>,
): SizingInsightsTotals {
  const totals = emptySizingInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingInsightsByStatus(
  items: ReadonlyArray<SizingInsightsItem>,
): Record<SizingInsightsStatus, SizingInsightsItem[]> {
  const grouped: Record<SizingInsightsStatus, SizingInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingInsights(
  items: ReadonlyArray<SizingInsightsItem>,
  query: string,
): SizingInsightsItem[] {
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

export function sortSizingInsights(
  items: ReadonlyArray<SizingInsightsItem>,
  key: SizingInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingInsightsItem[] {
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

export function describeSizingInsightsItem(item: SizingInsightsItem): string {
  const amount = asyncText(item.amount);
  const name = validateAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingInsightsAmount(amount: number): string {
  return asyncText(amount);
}

export function sizingInsightsStatusTone(
  status: SizingInsightsStatus,
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

export function pickSizingInsightsHighlights(
  items: ReadonlyArray<SizingInsightsItem>,
  limit = 3,
): SizingInsightsItem[] {
  return sortSizingInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
