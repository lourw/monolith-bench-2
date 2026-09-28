import { collectionPercent } from '../../../utils/collection/collection-percent';
import {
  emptyProfileListTotals,
  type ProfileListItem,
  type ProfileListStatus,
  type ProfileListTotals,
} from './profile-list.model';

export type ProfileListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileList(
  items: ReadonlyArray<ProfileListItem>,
): ProfileListTotals {
  const totals = emptyProfileListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileListByStatus(
  items: ReadonlyArray<ProfileListItem>,
): Record<ProfileListStatus, ProfileListItem[]> {
  const grouped: Record<ProfileListStatus, ProfileListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileList(
  items: ReadonlyArray<ProfileListItem>,
  query: string,
): ProfileListItem[] {
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

export function sortProfileList(
  items: ReadonlyArray<ProfileListItem>,
  key: ProfileListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileListItem[] {
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

export function describeProfileListItem(item: ProfileListItem): string {
  const amount = collectionPercent(item.amount);
  const name = collectionPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileListAmount(amount: number): string {
  return collectionPercent(amount);
}

export function profileListStatusTone(
  status: ProfileListStatus,
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

export function pickProfileListHighlights(
  items: ReadonlyArray<ProfileListItem>,
  limit = 3,
): ProfileListItem[] {
  return sortProfileList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
