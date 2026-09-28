import { mathNumber } from '../../../utils/math/math-number';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import {
  emptyAuthSummaryTotals,
  type AuthSummaryItem,
  type AuthSummaryStatus,
  type AuthSummaryTotals,
} from './auth-summary.model';

export type AuthSummarySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthSummary(
  items: ReadonlyArray<AuthSummaryItem>,
): AuthSummaryTotals {
  const totals = emptyAuthSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthSummaryByStatus(
  items: ReadonlyArray<AuthSummaryItem>,
): Record<AuthSummaryStatus, AuthSummaryItem[]> {
  const grouped: Record<AuthSummaryStatus, AuthSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthSummary(
  items: ReadonlyArray<AuthSummaryItem>,
  query: string,
): AuthSummaryItem[] {
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

export function sortAuthSummary(
  items: ReadonlyArray<AuthSummaryItem>,
  key: AuthSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthSummaryItem[] {
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

export function describeAuthSummaryItem(item: AuthSummaryItem): string {
  const amount = mathNumber(item.amount);
  const name = i18nPhone(validatePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthSummaryAmount(amount: number): string {
  return mathNumber(amount);
}

export function authSummaryStatusTone(
  status: AuthSummaryStatus,
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

export function pickAuthSummaryHighlights(
  items: ReadonlyArray<AuthSummaryItem>,
  limit = 3,
): AuthSummaryItem[] {
  return sortAuthSummary(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
