import { mathDate } from '../../../utils/math/math-date';
import { formatCode } from '../../../utils/format/format-code';
import { storagePhone } from '../../../utils/storage/storage-phone';
import {
  emptyTrackingInsightsTotals,
  type TrackingInsightsItem,
  type TrackingInsightsStatus,
  type TrackingInsightsTotals,
} from './tracking-insights.model';

export type TrackingInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingInsights(
  items: ReadonlyArray<TrackingInsightsItem>,
): TrackingInsightsTotals {
  const totals = emptyTrackingInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingInsightsByStatus(
  items: ReadonlyArray<TrackingInsightsItem>,
): Record<TrackingInsightsStatus, TrackingInsightsItem[]> {
  const grouped: Record<TrackingInsightsStatus, TrackingInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingInsights(
  items: ReadonlyArray<TrackingInsightsItem>,
  query: string,
): TrackingInsightsItem[] {
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

export function sortTrackingInsights(
  items: ReadonlyArray<TrackingInsightsItem>,
  key: TrackingInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingInsightsItem[] {
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

export function describeTrackingInsightsItem(
  item: TrackingInsightsItem,
): string {
  const amount = mathDate(item.amount);
  const name = storagePhone(formatCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingInsightsAmount(amount: number): string {
  return mathDate(amount);
}

export function trackingInsightsStatusTone(
  status: TrackingInsightsStatus,
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

export function pickTrackingInsightsHighlights(
  items: ReadonlyArray<TrackingInsightsItem>,
  limit = 3,
): TrackingInsightsItem[] {
  return sortTrackingInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
