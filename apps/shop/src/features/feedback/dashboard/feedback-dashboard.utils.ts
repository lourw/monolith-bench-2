import { asyncPhone } from '../../../utils/async/async-phone';
import {
  emptyFeedbackDashboardTotals,
  type FeedbackDashboardItem,
  type FeedbackDashboardStatus,
  type FeedbackDashboardTotals,
} from './feedback-dashboard.model';

export type FeedbackDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackDashboard(
  items: ReadonlyArray<FeedbackDashboardItem>,
): FeedbackDashboardTotals {
  const totals = emptyFeedbackDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackDashboardByStatus(
  items: ReadonlyArray<FeedbackDashboardItem>,
): Record<FeedbackDashboardStatus, FeedbackDashboardItem[]> {
  const grouped: Record<FeedbackDashboardStatus, FeedbackDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackDashboard(
  items: ReadonlyArray<FeedbackDashboardItem>,
  query: string,
): FeedbackDashboardItem[] {
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

export function sortFeedbackDashboard(
  items: ReadonlyArray<FeedbackDashboardItem>,
  key: FeedbackDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackDashboardItem[] {
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

export function describeFeedbackDashboardItem(
  item: FeedbackDashboardItem,
): string {
  const amount = asyncPhone(item.amount);
  const name = asyncPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackDashboardAmount(amount: number): string {
  return asyncPhone(amount);
}

export function feedbackDashboardStatusTone(
  status: FeedbackDashboardStatus,
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

export function pickFeedbackDashboardHighlights(
  items: ReadonlyArray<FeedbackDashboardItem>,
  limit = 3,
): FeedbackDashboardItem[] {
  return sortFeedbackDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
