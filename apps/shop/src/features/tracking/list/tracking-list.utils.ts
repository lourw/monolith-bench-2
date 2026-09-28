import { formatPhone } from '../../../utils/format/format-phone';
import { asyncPhone } from '../../../utils/async/async-phone';
import { storageDate } from '../../../utils/storage/storage-date';
import {
  emptyTrackingListTotals,
  type TrackingListItem,
  type TrackingListStatus,
  type TrackingListTotals,
} from './tracking-list.model';

export type TrackingListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingList(
  items: ReadonlyArray<TrackingListItem>,
): TrackingListTotals {
  const totals = emptyTrackingListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingListByStatus(
  items: ReadonlyArray<TrackingListItem>,
): Record<TrackingListStatus, TrackingListItem[]> {
  const grouped: Record<TrackingListStatus, TrackingListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingList(
  items: ReadonlyArray<TrackingListItem>,
  query: string,
): TrackingListItem[] {
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

export function sortTrackingList(
  items: ReadonlyArray<TrackingListItem>,
  key: TrackingListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingListItem[] {
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

export function describeTrackingListItem(item: TrackingListItem): string {
  const amount = formatPhone(item.amount);
  const name = storageDate(asyncPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingListAmount(amount: number): string {
  return formatPhone(amount);
}

export function trackingListStatusTone(
  status: TrackingListStatus,
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

export function pickTrackingListHighlights(
  items: ReadonlyArray<TrackingListItem>,
  limit = 3,
): TrackingListItem[] {
  return sortTrackingList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
