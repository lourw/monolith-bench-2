import { asyncPhone } from '../../../utils/async/async-phone';
import { validatePercent } from '../../../utils/validate/validate-percent';
import {
  emptyFeedbackOverviewTotals,
  type FeedbackOverviewItem,
  type FeedbackOverviewStatus,
  type FeedbackOverviewTotals,
} from './feedback-overview.model';

export type FeedbackOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackOverview(
  items: ReadonlyArray<FeedbackOverviewItem>,
): FeedbackOverviewTotals {
  const totals = emptyFeedbackOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackOverviewByStatus(
  items: ReadonlyArray<FeedbackOverviewItem>,
): Record<FeedbackOverviewStatus, FeedbackOverviewItem[]> {
  const grouped: Record<FeedbackOverviewStatus, FeedbackOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackOverview(
  items: ReadonlyArray<FeedbackOverviewItem>,
  query: string,
): FeedbackOverviewItem[] {
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

export function sortFeedbackOverview(
  items: ReadonlyArray<FeedbackOverviewItem>,
  key: FeedbackOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackOverviewItem[] {
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

export function describeFeedbackOverviewItem(
  item: FeedbackOverviewItem,
): string {
  const amount = asyncPhone(item.amount);
  const name = validatePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackOverviewAmount(amount: number): string {
  return asyncPhone(amount);
}

export function feedbackOverviewStatusTone(
  status: FeedbackOverviewStatus,
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

export function pickFeedbackOverviewHighlights(
  items: ReadonlyArray<FeedbackOverviewItem>,
  limit = 3,
): FeedbackOverviewItem[] {
  return sortFeedbackOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
