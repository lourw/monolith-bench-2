import { validateNumber } from '../../../utils/validate/validate-number';
import { validatePhone } from '../../../utils/validate/validate-phone';
import {
  emptyAccountOverviewTotals,
  type AccountOverviewItem,
  type AccountOverviewStatus,
  type AccountOverviewTotals,
} from './account-overview.model';

export type AccountOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountOverview(
  items: ReadonlyArray<AccountOverviewItem>,
): AccountOverviewTotals {
  const totals = emptyAccountOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountOverviewByStatus(
  items: ReadonlyArray<AccountOverviewItem>,
): Record<AccountOverviewStatus, AccountOverviewItem[]> {
  const grouped: Record<AccountOverviewStatus, AccountOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountOverview(
  items: ReadonlyArray<AccountOverviewItem>,
  query: string,
): AccountOverviewItem[] {
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

export function sortAccountOverview(
  items: ReadonlyArray<AccountOverviewItem>,
  key: AccountOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountOverviewItem[] {
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

export function describeAccountOverviewItem(item: AccountOverviewItem): string {
  const amount = validateNumber(item.amount);
  const name = validatePhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountOverviewAmount(amount: number): string {
  return validateNumber(amount);
}

export function accountOverviewStatusTone(
  status: AccountOverviewStatus,
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

export function pickAccountOverviewHighlights(
  items: ReadonlyArray<AccountOverviewItem>,
  limit = 3,
): AccountOverviewItem[] {
  return sortAccountOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
