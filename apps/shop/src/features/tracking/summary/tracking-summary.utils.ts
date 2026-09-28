import { i18nText } from '../../../utils/i18n/i18n-text';
import { mathName } from '../../../utils/math/math-name';
import {
  emptyTrackingSummaryTotals,
  type TrackingSummaryItem,
  type TrackingSummaryStatus,
  type TrackingSummaryTotals,
} from './tracking-summary.model';

export type TrackingSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingSummary(
  items: ReadonlyArray<TrackingSummaryItem>,
): TrackingSummaryTotals {
  const totals = emptyTrackingSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingSummaryByStatus(
  items: ReadonlyArray<TrackingSummaryItem>,
): Record<TrackingSummaryStatus, TrackingSummaryItem[]> {
  const grouped: Record<TrackingSummaryStatus, TrackingSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingSummary(
  items: ReadonlyArray<TrackingSummaryItem>,
  query: string,
): TrackingSummaryItem[] {
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

export function sortTrackingSummary(
  items: ReadonlyArray<TrackingSummaryItem>,
  key: TrackingSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingSummaryItem[] {
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

export function describeTrackingSummaryItem(item: TrackingSummaryItem): string {
  const amount = i18nText(item.amount);
  const name = mathName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingSummaryAmount(amount: number): string {
  return i18nText(amount);
}

export function trackingSummaryStatusTone(
  status: TrackingSummaryStatus,
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

export function pickTrackingSummaryHighlights(
  items: ReadonlyArray<TrackingSummaryItem>,
  limit = 3,
): TrackingSummaryItem[] {
  return sortTrackingSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
