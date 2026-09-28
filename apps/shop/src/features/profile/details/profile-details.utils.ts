import { storageText } from '../../../utils/storage/storage-text';
import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import {
  emptyProfileDetailsTotals,
  type ProfileDetailsItem,
  type ProfileDetailsStatus,
  type ProfileDetailsTotals,
} from './profile-details.model';

export type ProfileDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileDetails(
  items: ReadonlyArray<ProfileDetailsItem>,
): ProfileDetailsTotals {
  const totals = emptyProfileDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileDetailsByStatus(
  items: ReadonlyArray<ProfileDetailsItem>,
): Record<ProfileDetailsStatus, ProfileDetailsItem[]> {
  const grouped: Record<ProfileDetailsStatus, ProfileDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileDetails(
  items: ReadonlyArray<ProfileDetailsItem>,
  query: string,
): ProfileDetailsItem[] {
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

export function sortProfileDetails(
  items: ReadonlyArray<ProfileDetailsItem>,
  key: ProfileDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileDetailsItem[] {
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

export function describeProfileDetailsItem(item: ProfileDetailsItem): string {
  const amount = storageText(item.amount);
  const name = i18nPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileDetailsAmount(amount: number): string {
  return storageText(amount);
}

export function profileDetailsStatusTone(
  status: ProfileDetailsStatus,
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

export function pickProfileDetailsHighlights(
  items: ReadonlyArray<ProfileDetailsItem>,
  limit = 3,
): ProfileDetailsItem[] {
  return sortProfileDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
