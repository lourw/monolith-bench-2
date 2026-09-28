import { formatNumber } from '../../../utils/format/format-number';
import {
  emptyGiftCardsInsightsTotals,
  type GiftCardsInsightsItem,
  type GiftCardsInsightsStatus,
  type GiftCardsInsightsTotals,
} from './gift-cards-insights.model';

export type GiftCardsInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsInsights(
  items: ReadonlyArray<GiftCardsInsightsItem>,
): GiftCardsInsightsTotals {
  const totals = emptyGiftCardsInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsInsightsByStatus(
  items: ReadonlyArray<GiftCardsInsightsItem>,
): Record<GiftCardsInsightsStatus, GiftCardsInsightsItem[]> {
  const grouped: Record<GiftCardsInsightsStatus, GiftCardsInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsInsights(
  items: ReadonlyArray<GiftCardsInsightsItem>,
  query: string,
): GiftCardsInsightsItem[] {
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

export function sortGiftCardsInsights(
  items: ReadonlyArray<GiftCardsInsightsItem>,
  key: GiftCardsInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsInsightsItem[] {
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

export function describeGiftCardsInsightsItem(
  item: GiftCardsInsightsItem,
): string {
  const amount = formatNumber(item.amount);
  const name = formatNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsInsightsAmount(amount: number): string {
  return formatNumber(amount);
}

export function giftCardsInsightsStatusTone(
  status: GiftCardsInsightsStatus,
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

export function pickGiftCardsInsightsHighlights(
  items: ReadonlyArray<GiftCardsInsightsItem>,
  limit = 3,
): GiftCardsInsightsItem[] {
  return sortGiftCardsInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
