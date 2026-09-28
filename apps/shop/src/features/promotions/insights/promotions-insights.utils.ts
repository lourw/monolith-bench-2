import { storageText } from '../../../utils/storage/storage-text';
import { mathAddress } from '../../../utils/math/math-address';
import {
  emptyPromotionsInsightsTotals,
  type PromotionsInsightsItem,
  type PromotionsInsightsStatus,
  type PromotionsInsightsTotals,
} from './promotions-insights.model';

export type PromotionsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsInsights(
  items: ReadonlyArray<PromotionsInsightsItem>,
): PromotionsInsightsTotals {
  const totals = emptyPromotionsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsInsightsByStatus(
  items: ReadonlyArray<PromotionsInsightsItem>,
): Record<PromotionsInsightsStatus, PromotionsInsightsItem[]> {
  const grouped: Record<PromotionsInsightsStatus, PromotionsInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsInsights(
  items: ReadonlyArray<PromotionsInsightsItem>,
  query: string,
): PromotionsInsightsItem[] {
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

export function sortPromotionsInsights(
  items: ReadonlyArray<PromotionsInsightsItem>,
  key: PromotionsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsInsightsItem[] {
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

export function describePromotionsInsightsItem(
  item: PromotionsInsightsItem,
): string {
  const amount = storageText(item.amount);
  const name = mathAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsInsightsAmount(amount: number): string {
  return storageText(amount);
}

export function promotionsInsightsStatusTone(
  status: PromotionsInsightsStatus,
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

export function pickPromotionsInsightsHighlights(
  items: ReadonlyArray<PromotionsInsightsItem>,
  limit = 3,
): PromotionsInsightsItem[] {
  return sortPromotionsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
