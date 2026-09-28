import { asyncPercent } from '../../../utils/async/async-percent';
import { asyncSlug } from '../../../utils/async/async-slug';
import {
  emptyAuthHistoryTotals,
  type AuthHistoryItem,
  type AuthHistoryStatus,
  type AuthHistoryTotals,
} from './auth-history.model';

export type AuthHistorySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthHistory(
  items: ReadonlyArray<AuthHistoryItem>,
): AuthHistoryTotals {
  const totals = emptyAuthHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthHistoryByStatus(
  items: ReadonlyArray<AuthHistoryItem>,
): Record<AuthHistoryStatus, AuthHistoryItem[]> {
  const grouped: Record<AuthHistoryStatus, AuthHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthHistory(
  items: ReadonlyArray<AuthHistoryItem>,
  query: string,
): AuthHistoryItem[] {
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

export function sortAuthHistory(
  items: ReadonlyArray<AuthHistoryItem>,
  key: AuthHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthHistoryItem[] {
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

export function describeAuthHistoryItem(item: AuthHistoryItem): string {
  const amount = asyncPercent(item.amount);
  const name = asyncSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthHistoryAmount(amount: number): string {
  return asyncPercent(amount);
}

export function authHistoryStatusTone(
  status: AuthHistoryStatus,
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

export function pickAuthHistoryHighlights(
  items: ReadonlyArray<AuthHistoryItem>,
  limit = 3,
): AuthHistoryItem[] {
  return sortAuthHistory(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
