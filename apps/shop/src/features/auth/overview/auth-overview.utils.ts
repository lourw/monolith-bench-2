import { formatName } from '../../../utils/format/format-name';
import { formatDate } from '../../../utils/format/format-date';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import {
  emptyAuthOverviewTotals,
  type AuthOverviewItem,
  type AuthOverviewStatus,
  type AuthOverviewTotals,
} from './auth-overview.model';

export type AuthOverviewSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthOverview(
  items: ReadonlyArray<AuthOverviewItem>,
): AuthOverviewTotals {
  const totals = emptyAuthOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthOverviewByStatus(
  items: ReadonlyArray<AuthOverviewItem>,
): Record<AuthOverviewStatus, AuthOverviewItem[]> {
  const grouped: Record<AuthOverviewStatus, AuthOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthOverview(
  items: ReadonlyArray<AuthOverviewItem>,
  query: string,
): AuthOverviewItem[] {
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

export function sortAuthOverview(
  items: ReadonlyArray<AuthOverviewItem>,
  key: AuthOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthOverviewItem[] {
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

export function describeAuthOverviewItem(item: AuthOverviewItem): string {
  const amount = formatName(item.amount);
  const name = i18nAddress(formatDate(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthOverviewAmount(amount: number): string {
  return formatName(amount);
}

export function authOverviewStatusTone(
  status: AuthOverviewStatus,
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

export function pickAuthOverviewHighlights(
  items: ReadonlyArray<AuthOverviewItem>,
  limit = 3,
): AuthOverviewItem[] {
  return sortAuthOverview(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
