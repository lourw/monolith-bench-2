import { formatCode } from '../../../utils/format/format-code';
import { storageText } from '../../../utils/storage/storage-text';
import {
  emptyFeedbackInsightsTotals,
  type FeedbackInsightsItem,
  type FeedbackInsightsStatus,
  type FeedbackInsightsTotals,
} from './feedback-insights.model';

export type FeedbackInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackInsights(
  items: ReadonlyArray<FeedbackInsightsItem>,
): FeedbackInsightsTotals {
  const totals = emptyFeedbackInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackInsightsByStatus(
  items: ReadonlyArray<FeedbackInsightsItem>,
): Record<FeedbackInsightsStatus, FeedbackInsightsItem[]> {
  const grouped: Record<FeedbackInsightsStatus, FeedbackInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackInsights(
  items: ReadonlyArray<FeedbackInsightsItem>,
  query: string,
): FeedbackInsightsItem[] {
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

export function sortFeedbackInsights(
  items: ReadonlyArray<FeedbackInsightsItem>,
  key: FeedbackInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackInsightsItem[] {
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

export function describeFeedbackInsightsItem(
  item: FeedbackInsightsItem,
): string {
  const amount = formatCode(item.amount);
  const name = storageText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackInsightsAmount(amount: number): string {
  return formatCode(amount);
}

export function feedbackInsightsStatusTone(
  status: FeedbackInsightsStatus,
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

export function pickFeedbackInsightsHighlights(
  items: ReadonlyArray<FeedbackInsightsItem>,
  limit = 3,
): FeedbackInsightsItem[] {
  return sortFeedbackInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
