import { collectionText } from '../../../utils/collection/collection-text';
import { storagePercent } from '../../../utils/storage/storage-percent';
import {
  emptyTrackingDetailsTotals,
  type TrackingDetailsItem,
  type TrackingDetailsStatus,
  type TrackingDetailsTotals,
} from './tracking-details.model';

export type TrackingDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingDetails(
  items: ReadonlyArray<TrackingDetailsItem>,
): TrackingDetailsTotals {
  const totals = emptyTrackingDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingDetailsByStatus(
  items: ReadonlyArray<TrackingDetailsItem>,
): Record<TrackingDetailsStatus, TrackingDetailsItem[]> {
  const grouped: Record<TrackingDetailsStatus, TrackingDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingDetails(
  items: ReadonlyArray<TrackingDetailsItem>,
  query: string,
): TrackingDetailsItem[] {
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

export function sortTrackingDetails(
  items: ReadonlyArray<TrackingDetailsItem>,
  key: TrackingDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingDetailsItem[] {
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

export function describeTrackingDetailsItem(item: TrackingDetailsItem): string {
  const amount = collectionText(item.amount);
  const name = storagePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingDetailsAmount(amount: number): string {
  return collectionText(amount);
}

export function trackingDetailsStatusTone(
  status: TrackingDetailsStatus,
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

export function pickTrackingDetailsHighlights(
  items: ReadonlyArray<TrackingDetailsItem>,
  limit = 3,
): TrackingDetailsItem[] {
  return sortTrackingDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
