import { formatCode } from '../../../utils/format/format-code';
import {
  emptyAnalyticsInsightsTotals,
  type AnalyticsInsightsItem,
  type AnalyticsInsightsStatus,
  type AnalyticsInsightsTotals,
} from './analytics-insights.model';

export type AnalyticsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsInsights(
  items: ReadonlyArray<AnalyticsInsightsItem>,
): AnalyticsInsightsTotals {
  const totals = emptyAnalyticsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsInsightsByStatus(
  items: ReadonlyArray<AnalyticsInsightsItem>,
): Record<AnalyticsInsightsStatus, AnalyticsInsightsItem[]> {
  const grouped: Record<AnalyticsInsightsStatus, AnalyticsInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsInsights(
  items: ReadonlyArray<AnalyticsInsightsItem>,
  query: string,
): AnalyticsInsightsItem[] {
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

export function sortAnalyticsInsights(
  items: ReadonlyArray<AnalyticsInsightsItem>,
  key: AnalyticsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsInsightsItem[] {
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

export function describeAnalyticsInsightsItem(
  item: AnalyticsInsightsItem,
): string {
  const amount = formatCode(item.amount);
  const name = formatCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsInsightsAmount(amount: number): string {
  return formatCode(amount);
}

export function analyticsInsightsStatusTone(
  status: AnalyticsInsightsStatus,
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

export function pickAnalyticsInsightsHighlights(
  items: ReadonlyArray<AnalyticsInsightsItem>,
  limit = 3,
): AnalyticsInsightsItem[] {
  return sortAnalyticsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
