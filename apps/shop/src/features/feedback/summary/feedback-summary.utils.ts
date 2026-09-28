import { asyncText } from '../../../utils/async/async-text';
import {
  emptyFeedbackSummaryTotals,
  type FeedbackSummaryItem,
  type FeedbackSummaryStatus,
  type FeedbackSummaryTotals,
} from './feedback-summary.model';

export type FeedbackSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackSummary(
  items: ReadonlyArray<FeedbackSummaryItem>,
): FeedbackSummaryTotals {
  const totals = emptyFeedbackSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackSummaryByStatus(
  items: ReadonlyArray<FeedbackSummaryItem>,
): Record<FeedbackSummaryStatus, FeedbackSummaryItem[]> {
  const grouped: Record<FeedbackSummaryStatus, FeedbackSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackSummary(
  items: ReadonlyArray<FeedbackSummaryItem>,
  query: string,
): FeedbackSummaryItem[] {
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

export function sortFeedbackSummary(
  items: ReadonlyArray<FeedbackSummaryItem>,
  key: FeedbackSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackSummaryItem[] {
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

export function describeFeedbackSummaryItem(item: FeedbackSummaryItem): string {
  const amount = asyncText(item.amount);
  const name = asyncText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackSummaryAmount(amount: number): string {
  return asyncText(amount);
}

export function feedbackSummaryStatusTone(
  status: FeedbackSummaryStatus,
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

export function pickFeedbackSummaryHighlights(
  items: ReadonlyArray<FeedbackSummaryItem>,
  limit = 3,
): FeedbackSummaryItem[] {
  return sortFeedbackSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
