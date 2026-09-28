import { validatePhone } from '../../../utils/validate/validate-phone';
import { formatText } from '../../../utils/format/format-text';
import {
  emptyReviewsDashboardTotals,
  type ReviewsDashboardItem,
  type ReviewsDashboardStatus,
  type ReviewsDashboardTotals,
} from './reviews-dashboard.model';

export type ReviewsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsDashboard(
  items: ReadonlyArray<ReviewsDashboardItem>,
): ReviewsDashboardTotals {
  const totals = emptyReviewsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsDashboardByStatus(
  items: ReadonlyArray<ReviewsDashboardItem>,
): Record<ReviewsDashboardStatus, ReviewsDashboardItem[]> {
  const grouped: Record<ReviewsDashboardStatus, ReviewsDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsDashboard(
  items: ReadonlyArray<ReviewsDashboardItem>,
  query: string,
): ReviewsDashboardItem[] {
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

export function sortReviewsDashboard(
  items: ReadonlyArray<ReviewsDashboardItem>,
  key: ReviewsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsDashboardItem[] {
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

export function describeReviewsDashboardItem(
  item: ReviewsDashboardItem,
): string {
  const amount = validatePhone(item.amount);
  const name = formatText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsDashboardAmount(amount: number): string {
  return validatePhone(amount);
}

export function reviewsDashboardStatusTone(
  status: ReviewsDashboardStatus,
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

export function pickReviewsDashboardHighlights(
  items: ReadonlyArray<ReviewsDashboardItem>,
  limit = 3,
): ReviewsDashboardItem[] {
  return sortReviewsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
