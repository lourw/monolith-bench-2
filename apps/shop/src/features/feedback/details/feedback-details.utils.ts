import { formatText } from '../../../utils/format/format-text';
import { asyncCode } from '../../../utils/async/async-code';
import { asyncPhone } from '../../../utils/async/async-phone';
import {
  emptyFeedbackDetailsTotals,
  type FeedbackDetailsItem,
  type FeedbackDetailsStatus,
  type FeedbackDetailsTotals,
} from './feedback-details.model';

export type FeedbackDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackDetails(
  items: ReadonlyArray<FeedbackDetailsItem>,
): FeedbackDetailsTotals {
  const totals = emptyFeedbackDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackDetailsByStatus(
  items: ReadonlyArray<FeedbackDetailsItem>,
): Record<FeedbackDetailsStatus, FeedbackDetailsItem[]> {
  const grouped: Record<FeedbackDetailsStatus, FeedbackDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackDetails(
  items: ReadonlyArray<FeedbackDetailsItem>,
  query: string,
): FeedbackDetailsItem[] {
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

export function sortFeedbackDetails(
  items: ReadonlyArray<FeedbackDetailsItem>,
  key: FeedbackDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackDetailsItem[] {
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

export function describeFeedbackDetailsItem(item: FeedbackDetailsItem): string {
  const amount = formatText(item.amount);
  const name = asyncPhone(asyncCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackDetailsAmount(amount: number): string {
  return formatText(amount);
}

export function feedbackDetailsStatusTone(
  status: FeedbackDetailsStatus,
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

export function pickFeedbackDetailsHighlights(
  items: ReadonlyArray<FeedbackDetailsItem>,
  limit = 3,
): FeedbackDetailsItem[] {
  return sortFeedbackDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
