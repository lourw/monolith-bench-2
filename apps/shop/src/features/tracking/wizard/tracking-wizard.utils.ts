import { mathSlug } from '../../../utils/math/math-slug';
import { storageName } from '../../../utils/storage/storage-name';
import { mathName } from '../../../utils/math/math-name';
import {
  emptyTrackingWizardTotals,
  type TrackingWizardItem,
  type TrackingWizardStatus,
  type TrackingWizardTotals,
} from './tracking-wizard.model';

export type TrackingWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalTrackingWizard(
  items: ReadonlyArray<TrackingWizardItem>,
): TrackingWizardTotals {
  const totals = emptyTrackingWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupTrackingWizardByStatus(
  items: ReadonlyArray<TrackingWizardItem>,
): Record<TrackingWizardStatus, TrackingWizardItem[]> {
  const grouped: Record<TrackingWizardStatus, TrackingWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterTrackingWizard(
  items: ReadonlyArray<TrackingWizardItem>,
  query: string,
): TrackingWizardItem[] {
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

export function sortTrackingWizard(
  items: ReadonlyArray<TrackingWizardItem>,
  key: TrackingWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): TrackingWizardItem[] {
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

export function describeTrackingWizardItem(item: TrackingWizardItem): string {
  const amount = mathSlug(item.amount);
  const name = mathName(storageName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatTrackingWizardAmount(amount: number): string {
  return mathSlug(amount);
}

export function trackingWizardStatusTone(
  status: TrackingWizardStatus,
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

export function pickTrackingWizardHighlights(
  items: ReadonlyArray<TrackingWizardItem>,
  limit = 3,
): TrackingWizardItem[] {
  return sortTrackingWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
