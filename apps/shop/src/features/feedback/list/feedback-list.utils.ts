import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { validateNumber } from '../../../utils/validate/validate-number';
import {
  emptyFeedbackListTotals,
  type FeedbackListItem,
  type FeedbackListStatus,
  type FeedbackListTotals,
} from './feedback-list.model';

export type FeedbackListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackList(
  items: ReadonlyArray<FeedbackListItem>,
): FeedbackListTotals {
  const totals = emptyFeedbackListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackListByStatus(
  items: ReadonlyArray<FeedbackListItem>,
): Record<FeedbackListStatus, FeedbackListItem[]> {
  const grouped: Record<FeedbackListStatus, FeedbackListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackList(
  items: ReadonlyArray<FeedbackListItem>,
  query: string,
): FeedbackListItem[] {
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

export function sortFeedbackList(
  items: ReadonlyArray<FeedbackListItem>,
  key: FeedbackListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackListItem[] {
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

export function describeFeedbackListItem(item: FeedbackListItem): string {
  const amount = i18nAddress(item.amount);
  const name = validateNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackListAmount(amount: number): string {
  return i18nAddress(amount);
}

export function feedbackListStatusTone(
  status: FeedbackListStatus,
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

export function pickFeedbackListHighlights(
  items: ReadonlyArray<FeedbackListItem>,
  limit = 3,
): FeedbackListItem[] {
  return sortFeedbackList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
