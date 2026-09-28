import { asyncCode } from '../../../utils/async/async-code';
import {
  emptyAccountSummaryTotals,
  type AccountSummaryItem,
  type AccountSummaryStatus,
  type AccountSummaryTotals,
} from './account-summary.model';

export type AccountSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountSummary(
  items: ReadonlyArray<AccountSummaryItem>,
): AccountSummaryTotals {
  const totals = emptyAccountSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountSummaryByStatus(
  items: ReadonlyArray<AccountSummaryItem>,
): Record<AccountSummaryStatus, AccountSummaryItem[]> {
  const grouped: Record<AccountSummaryStatus, AccountSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountSummary(
  items: ReadonlyArray<AccountSummaryItem>,
  query: string,
): AccountSummaryItem[] {
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

export function sortAccountSummary(
  items: ReadonlyArray<AccountSummaryItem>,
  key: AccountSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountSummaryItem[] {
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

export function describeAccountSummaryItem(item: AccountSummaryItem): string {
  const amount = asyncCode(item.amount);
  const name = asyncCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountSummaryAmount(amount: number): string {
  return asyncCode(amount);
}

export function accountSummaryStatusTone(
  status: AccountSummaryStatus,
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

export function pickAccountSummaryHighlights(
  items: ReadonlyArray<AccountSummaryItem>,
  limit = 3,
): AccountSummaryItem[] {
  return sortAccountSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
