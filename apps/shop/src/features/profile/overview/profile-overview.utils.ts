import { collectionSlug } from '../../../utils/collection/collection-slug';
import { storageNumber } from '../../../utils/storage/storage-number';
import { formatCode } from '../../../utils/format/format-code';
import {
  emptyProfileOverviewTotals,
  type ProfileOverviewItem,
  type ProfileOverviewStatus,
  type ProfileOverviewTotals,
} from './profile-overview.model';

export type ProfileOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileOverview(
  items: ReadonlyArray<ProfileOverviewItem>,
): ProfileOverviewTotals {
  const totals = emptyProfileOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileOverviewByStatus(
  items: ReadonlyArray<ProfileOverviewItem>,
): Record<ProfileOverviewStatus, ProfileOverviewItem[]> {
  const grouped: Record<ProfileOverviewStatus, ProfileOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileOverview(
  items: ReadonlyArray<ProfileOverviewItem>,
  query: string,
): ProfileOverviewItem[] {
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

export function sortProfileOverview(
  items: ReadonlyArray<ProfileOverviewItem>,
  key: ProfileOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileOverviewItem[] {
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

export function describeProfileOverviewItem(item: ProfileOverviewItem): string {
  const amount = collectionSlug(item.amount);
  const name = formatCode(storageNumber(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileOverviewAmount(amount: number): string {
  return collectionSlug(amount);
}

export function profileOverviewStatusTone(
  status: ProfileOverviewStatus,
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

export function pickProfileOverviewHighlights(
  items: ReadonlyArray<ProfileOverviewItem>,
  limit = 3,
): ProfileOverviewItem[] {
  return sortProfileOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
