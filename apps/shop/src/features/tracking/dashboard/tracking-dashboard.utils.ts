import { mathPhone } from '../../../utils/math/math-phone';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import {
  emptyTrackingDashboardTotals,
  type TrackingDashboardItem,
  type TrackingDashboardStatus,
  type TrackingDashboardTotals,
} from './tracking-dashboard.model';

export type TrackingDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingDashboard(
  items: ReadonlyArray<TrackingDashboardItem>,
): TrackingDashboardTotals {
  const totals = emptyTrackingDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingDashboardByStatus(
  items: ReadonlyArray<TrackingDashboardItem>,
): Record<TrackingDashboardStatus, TrackingDashboardItem[]> {
  const grouped: Record<TrackingDashboardStatus, TrackingDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingDashboard(
  items: ReadonlyArray<TrackingDashboardItem>,
  query: string,
): TrackingDashboardItem[] {
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

export function sortTrackingDashboard(
  items: ReadonlyArray<TrackingDashboardItem>,
  key: TrackingDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingDashboardItem[] {
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

export function describeTrackingDashboardItem(
  item: TrackingDashboardItem,
): string {
  const amount = mathPhone(item.amount);
  const name = i18nSlug(i18nAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingDashboardAmount(amount: number): string {
  return mathPhone(amount);
}

export function trackingDashboardStatusTone(
  status: TrackingDashboardStatus,
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

export function pickTrackingDashboardHighlights(
  items: ReadonlyArray<TrackingDashboardItem>,
  limit = 3,
): TrackingDashboardItem[] {
  return sortTrackingDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
