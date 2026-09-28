import { formatPercent } from '../../../utils/format/format-percent';
import {
  emptyLoyaltyInsightsTotals,
  type LoyaltyInsightsItem,
  type LoyaltyInsightsStatus,
  type LoyaltyInsightsTotals,
} from './loyalty-insights.model';

export type LoyaltyInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyInsights(
  items: ReadonlyArray<LoyaltyInsightsItem>,
): LoyaltyInsightsTotals {
  const totals = emptyLoyaltyInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyInsightsByStatus(
  items: ReadonlyArray<LoyaltyInsightsItem>,
): Record<LoyaltyInsightsStatus, LoyaltyInsightsItem[]> {
  const grouped: Record<LoyaltyInsightsStatus, LoyaltyInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyInsights(
  items: ReadonlyArray<LoyaltyInsightsItem>,
  query: string,
): LoyaltyInsightsItem[] {
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

export function sortLoyaltyInsights(
  items: ReadonlyArray<LoyaltyInsightsItem>,
  key: LoyaltyInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyInsightsItem[] {
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

export function describeLoyaltyInsightsItem(item: LoyaltyInsightsItem): string {
  const amount = formatPercent(item.amount);
  const name = formatPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyInsightsAmount(amount: number): string {
  return formatPercent(amount);
}

export function loyaltyInsightsStatusTone(
  status: LoyaltyInsightsStatus,
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

export function pickLoyaltyInsightsHighlights(
  items: ReadonlyArray<LoyaltyInsightsItem>,
  limit = 3,
): LoyaltyInsightsItem[] {
  return sortLoyaltyInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
