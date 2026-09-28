import { validateName } from '../../../utils/validate/validate-name';
import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptyFeedbackHistoryTotals,
  type FeedbackHistoryItem,
  type FeedbackHistoryStatus,
  type FeedbackHistoryTotals,
} from './feedback-history.model';

export type FeedbackHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackHistory(
  items: ReadonlyArray<FeedbackHistoryItem>,
): FeedbackHistoryTotals {
  const totals = emptyFeedbackHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackHistoryByStatus(
  items: ReadonlyArray<FeedbackHistoryItem>,
): Record<FeedbackHistoryStatus, FeedbackHistoryItem[]> {
  const grouped: Record<FeedbackHistoryStatus, FeedbackHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackHistory(
  items: ReadonlyArray<FeedbackHistoryItem>,
  query: string,
): FeedbackHistoryItem[] {
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

export function sortFeedbackHistory(
  items: ReadonlyArray<FeedbackHistoryItem>,
  key: FeedbackHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackHistoryItem[] {
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

export function describeFeedbackHistoryItem(item: FeedbackHistoryItem): string {
  const amount = validateName(item.amount);
  const name = storageAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackHistoryAmount(amount: number): string {
  return validateName(amount);
}

export function feedbackHistoryStatusTone(
  status: FeedbackHistoryStatus,
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

export function pickFeedbackHistoryHighlights(
  items: ReadonlyArray<FeedbackHistoryItem>,
  limit = 3,
): FeedbackHistoryItem[] {
  return sortFeedbackHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
