import { asyncNumber } from '../../../utils/async/async-number';
import {
  emptyAccountListTotals,
  type AccountListItem,
  type AccountListStatus,
  type AccountListTotals,
} from './account-list.model';

export type AccountListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountList(
  items: ReadonlyArray<AccountListItem>,
): AccountListTotals {
  const totals = emptyAccountListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountListByStatus(
  items: ReadonlyArray<AccountListItem>,
): Record<AccountListStatus, AccountListItem[]> {
  const grouped: Record<AccountListStatus, AccountListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountList(
  items: ReadonlyArray<AccountListItem>,
  query: string,
): AccountListItem[] {
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

export function sortAccountList(
  items: ReadonlyArray<AccountListItem>,
  key: AccountListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountListItem[] {
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

export function describeAccountListItem(item: AccountListItem): string {
  const amount = asyncNumber(item.amount);
  const name = asyncNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountListAmount(amount: number): string {
  return asyncNumber(amount);
}

export function accountListStatusTone(
  status: AccountListStatus,
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

export function pickAccountListHighlights(
  items: ReadonlyArray<AccountListItem>,
  limit = 3,
): AccountListItem[] {
  return sortAccountList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
