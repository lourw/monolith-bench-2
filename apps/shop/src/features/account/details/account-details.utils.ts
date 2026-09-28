import { formatCurrency } from '../../../utils/format/format-currency';
import {
  emptyAccountDetailsTotals,
  type AccountDetailsItem,
  type AccountDetailsStatus,
  type AccountDetailsTotals,
} from './account-details.model';

export type AccountDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountDetails(
  items: ReadonlyArray<AccountDetailsItem>,
): AccountDetailsTotals {
  const totals = emptyAccountDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountDetailsByStatus(
  items: ReadonlyArray<AccountDetailsItem>,
): Record<AccountDetailsStatus, AccountDetailsItem[]> {
  const grouped: Record<AccountDetailsStatus, AccountDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountDetails(
  items: ReadonlyArray<AccountDetailsItem>,
  query: string,
): AccountDetailsItem[] {
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

export function sortAccountDetails(
  items: ReadonlyArray<AccountDetailsItem>,
  key: AccountDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountDetailsItem[] {
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

export function describeAccountDetailsItem(item: AccountDetailsItem): string {
  const amount = formatCurrency(item.amount);
  const name = formatCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountDetailsAmount(amount: number): string {
  return formatCurrency(amount);
}

export function accountDetailsStatusTone(
  status: AccountDetailsStatus,
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

export function pickAccountDetailsHighlights(
  items: ReadonlyArray<AccountDetailsItem>,
  limit = 3,
): AccountDetailsItem[] {
  return sortAccountDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
