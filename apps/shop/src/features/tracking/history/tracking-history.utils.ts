import { collectionCode } from '../../../utils/collection/collection-code';
import {
  emptyTrackingHistoryTotals,
  type TrackingHistoryItem,
  type TrackingHistoryStatus,
  type TrackingHistoryTotals,
} from './tracking-history.model';

export type TrackingHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingHistory(
  items: ReadonlyArray<TrackingHistoryItem>,
): TrackingHistoryTotals {
  const totals = emptyTrackingHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingHistoryByStatus(
  items: ReadonlyArray<TrackingHistoryItem>,
): Record<TrackingHistoryStatus, TrackingHistoryItem[]> {
  const grouped: Record<TrackingHistoryStatus, TrackingHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingHistory(
  items: ReadonlyArray<TrackingHistoryItem>,
  query: string,
): TrackingHistoryItem[] {
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

export function sortTrackingHistory(
  items: ReadonlyArray<TrackingHistoryItem>,
  key: TrackingHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingHistoryItem[] {
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

export function describeTrackingHistoryItem(item: TrackingHistoryItem): string {
  const amount = collectionCode(item.amount);
  const name = collectionCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingHistoryAmount(amount: number): string {
  return collectionCode(amount);
}

export function trackingHistoryStatusTone(
  status: TrackingHistoryStatus,
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

export function pickTrackingHistoryHighlights(
  items: ReadonlyArray<TrackingHistoryItem>,
  limit = 3,
): TrackingHistoryItem[] {
  return sortTrackingHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
