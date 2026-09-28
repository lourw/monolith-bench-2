import { collectionNumber } from '../../../utils/collection/collection-number';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import {
  emptySupportInsightsTotals,
  type SupportInsightsItem,
  type SupportInsightsStatus,
  type SupportInsightsTotals,
} from './support-insights.model';

export type SupportInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportInsights(
  items: ReadonlyArray<SupportInsightsItem>,
): SupportInsightsTotals {
  const totals = emptySupportInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportInsightsByStatus(
  items: ReadonlyArray<SupportInsightsItem>,
): Record<SupportInsightsStatus, SupportInsightsItem[]> {
  const grouped: Record<SupportInsightsStatus, SupportInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportInsights(
  items: ReadonlyArray<SupportInsightsItem>,
  query: string,
): SupportInsightsItem[] {
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

export function sortSupportInsights(
  items: ReadonlyArray<SupportInsightsItem>,
  key: SupportInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportInsightsItem[] {
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

export function describeSupportInsightsItem(item: SupportInsightsItem): string {
  const amount = collectionNumber(item.amount);
  const name = i18nDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportInsightsAmount(amount: number): string {
  return collectionNumber(amount);
}

export function supportInsightsStatusTone(
  status: SupportInsightsStatus,
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

export function pickSupportInsightsHighlights(
  items: ReadonlyArray<SupportInsightsItem>,
  limit = 3,
): SupportInsightsItem[] {
  return sortSupportInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
