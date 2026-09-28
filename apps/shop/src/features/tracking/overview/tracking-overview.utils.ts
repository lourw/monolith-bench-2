import { validateCurrency } from '../../../utils/validate/validate-currency';
import { storagePhone } from '../../../utils/storage/storage-phone';
import { validateAddress } from '../../../utils/validate/validate-address';
import {
  emptyTrackingOverviewTotals,
  type TrackingOverviewItem,
  type TrackingOverviewStatus,
  type TrackingOverviewTotals,
} from './tracking-overview.model';

export type TrackingOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingOverview(
  items: ReadonlyArray<TrackingOverviewItem>,
): TrackingOverviewTotals {
  const totals = emptyTrackingOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingOverviewByStatus(
  items: ReadonlyArray<TrackingOverviewItem>,
): Record<TrackingOverviewStatus, TrackingOverviewItem[]> {
  const grouped: Record<TrackingOverviewStatus, TrackingOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingOverview(
  items: ReadonlyArray<TrackingOverviewItem>,
  query: string,
): TrackingOverviewItem[] {
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

export function sortTrackingOverview(
  items: ReadonlyArray<TrackingOverviewItem>,
  key: TrackingOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingOverviewItem[] {
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

export function describeTrackingOverviewItem(
  item: TrackingOverviewItem,
): string {
  const amount = validateCurrency(item.amount);
  const name = validateAddress(storagePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingOverviewAmount(amount: number): string {
  return validateCurrency(amount);
}

export function trackingOverviewStatusTone(
  status: TrackingOverviewStatus,
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

export function pickTrackingOverviewHighlights(
  items: ReadonlyArray<TrackingOverviewItem>,
  limit = 3,
): TrackingOverviewItem[] {
  return sortTrackingOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
