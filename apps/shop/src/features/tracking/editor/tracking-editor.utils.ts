import { storageCurrency } from '../../../utils/storage/storage-currency';
import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import {
  emptyTrackingEditorTotals,
  type TrackingEditorItem,
  type TrackingEditorStatus,
  type TrackingEditorTotals,
} from './tracking-editor.model';

export type TrackingEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingEditor(
  items: ReadonlyArray<TrackingEditorItem>,
): TrackingEditorTotals {
  const totals = emptyTrackingEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingEditorByStatus(
  items: ReadonlyArray<TrackingEditorItem>,
): Record<TrackingEditorStatus, TrackingEditorItem[]> {
  const grouped: Record<TrackingEditorStatus, TrackingEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingEditor(
  items: ReadonlyArray<TrackingEditorItem>,
  query: string,
): TrackingEditorItem[] {
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

export function sortTrackingEditor(
  items: ReadonlyArray<TrackingEditorItem>,
  key: TrackingEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingEditorItem[] {
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

export function describeTrackingEditorItem(item: TrackingEditorItem): string {
  const amount = storageCurrency(item.amount);
  const name = i18nPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingEditorAmount(amount: number): string {
  return storageCurrency(amount);
}

export function trackingEditorStatusTone(
  status: TrackingEditorStatus,
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

export function pickTrackingEditorHighlights(
  items: ReadonlyArray<TrackingEditorItem>,
  limit = 3,
): TrackingEditorItem[] {
  return sortTrackingEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
