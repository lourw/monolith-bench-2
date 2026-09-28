import { i18nDate } from '../../../utils/i18n/i18n-date';
import { asyncName } from '../../../utils/async/async-name';
import { asyncPhone } from '../../../utils/async/async-phone';
import {
  emptyAuthDetailsTotals,
  type AuthDetailsItem,
  type AuthDetailsStatus,
  type AuthDetailsTotals,
} from './auth-details.model';

export type AuthDetailsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthDetails(
  items: ReadonlyArray<AuthDetailsItem>,
): AuthDetailsTotals {
  const totals = emptyAuthDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthDetailsByStatus(
  items: ReadonlyArray<AuthDetailsItem>,
): Record<AuthDetailsStatus, AuthDetailsItem[]> {
  const grouped: Record<AuthDetailsStatus, AuthDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthDetails(
  items: ReadonlyArray<AuthDetailsItem>,
  query: string,
): AuthDetailsItem[] {
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

export function sortAuthDetails(
  items: ReadonlyArray<AuthDetailsItem>,
  key: AuthDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthDetailsItem[] {
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

export function describeAuthDetailsItem(item: AuthDetailsItem): string {
  const amount = i18nDate(item.amount);
  const name = asyncPhone(asyncName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthDetailsAmount(amount: number): string {
  return i18nDate(amount);
}

export function authDetailsStatusTone(
  status: AuthDetailsStatus,
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

export function pickAuthDetailsHighlights(
  items: ReadonlyArray<AuthDetailsItem>,
  limit = 3,
): AuthDetailsItem[] {
  return sortAuthDetails(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
