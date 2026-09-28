import { validateSlug } from '../../../utils/validate/validate-slug';
import {
  emptyAuthListTotals,
  type AuthListItem,
  type AuthListStatus,
  type AuthListTotals,
} from './auth-list.model';

export type AuthListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthList(
  items: ReadonlyArray<AuthListItem>,
): AuthListTotals {
  const totals = emptyAuthListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthListByStatus(
  items: ReadonlyArray<AuthListItem>,
): Record<AuthListStatus, AuthListItem[]> {
  const grouped: Record<AuthListStatus, AuthListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthList(
  items: ReadonlyArray<AuthListItem>,
  query: string,
): AuthListItem[] {
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

export function sortAuthList(
  items: ReadonlyArray<AuthListItem>,
  key: AuthListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthListItem[] {
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

export function describeAuthListItem(item: AuthListItem): string {
  const amount = validateSlug(item.amount);
  const name = validateSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthListAmount(amount: number): string {
  return validateSlug(amount);
}

export function authListStatusTone(
  status: AuthListStatus,
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

export function pickAuthListHighlights(
  items: ReadonlyArray<AuthListItem>,
  limit = 3,
): AuthListItem[] {
  return sortAuthList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
