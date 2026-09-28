import { formatSlug } from '../../../utils/format/format-slug';
import { collectionCode } from '../../../utils/collection/collection-code';
import {
  emptyAuthInsightsTotals,
  type AuthInsightsItem,
  type AuthInsightsStatus,
  type AuthInsightsTotals,
} from './auth-insights.model';

export type AuthInsightsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthInsights(
  items: ReadonlyArray<AuthInsightsItem>,
): AuthInsightsTotals {
  const totals = emptyAuthInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthInsightsByStatus(
  items: ReadonlyArray<AuthInsightsItem>,
): Record<AuthInsightsStatus, AuthInsightsItem[]> {
  const grouped: Record<AuthInsightsStatus, AuthInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthInsights(
  items: ReadonlyArray<AuthInsightsItem>,
  query: string,
): AuthInsightsItem[] {
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

export function sortAuthInsights(
  items: ReadonlyArray<AuthInsightsItem>,
  key: AuthInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthInsightsItem[] {
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

export function describeAuthInsightsItem(item: AuthInsightsItem): string {
  const amount = formatSlug(item.amount);
  const name = collectionCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthInsightsAmount(amount: number): string {
  return formatSlug(amount);
}

export function authInsightsStatusTone(
  status: AuthInsightsStatus,
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

export function pickAuthInsightsHighlights(
  items: ReadonlyArray<AuthInsightsItem>,
  limit = 3,
): AuthInsightsItem[] {
  return sortAuthInsights(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
