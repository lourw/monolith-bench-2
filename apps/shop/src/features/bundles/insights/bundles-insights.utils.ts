import { mathDate } from '../../../utils/math/math-date';
import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import {
  emptyBundlesInsightsTotals,
  type BundlesInsightsItem,
  type BundlesInsightsStatus,
  type BundlesInsightsTotals,
} from './bundles-insights.model';

export type BundlesInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesInsights(
  items: ReadonlyArray<BundlesInsightsItem>,
): BundlesInsightsTotals {
  const totals = emptyBundlesInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesInsightsByStatus(
  items: ReadonlyArray<BundlesInsightsItem>,
): Record<BundlesInsightsStatus, BundlesInsightsItem[]> {
  const grouped: Record<BundlesInsightsStatus, BundlesInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesInsights(
  items: ReadonlyArray<BundlesInsightsItem>,
  query: string,
): BundlesInsightsItem[] {
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

export function sortBundlesInsights(
  items: ReadonlyArray<BundlesInsightsItem>,
  key: BundlesInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesInsightsItem[] {
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

export function describeBundlesInsightsItem(item: BundlesInsightsItem): string {
  const amount = mathDate(item.amount);
  const name = i18nPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesInsightsAmount(amount: number): string {
  return mathDate(amount);
}

export function bundlesInsightsStatusTone(
  status: BundlesInsightsStatus,
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

export function pickBundlesInsightsHighlights(
  items: ReadonlyArray<BundlesInsightsItem>,
  limit = 3,
): BundlesInsightsItem[] {
  return sortBundlesInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
