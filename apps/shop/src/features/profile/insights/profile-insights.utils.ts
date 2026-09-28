import { collectionPhone } from '../../../utils/collection/collection-phone';
import {
  emptyProfileInsightsTotals,
  type ProfileInsightsItem,
  type ProfileInsightsStatus,
  type ProfileInsightsTotals,
} from './profile-insights.model';

export type ProfileInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileInsights(
  items: ReadonlyArray<ProfileInsightsItem>,
): ProfileInsightsTotals {
  const totals = emptyProfileInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileInsightsByStatus(
  items: ReadonlyArray<ProfileInsightsItem>,
): Record<ProfileInsightsStatus, ProfileInsightsItem[]> {
  const grouped: Record<ProfileInsightsStatus, ProfileInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileInsights(
  items: ReadonlyArray<ProfileInsightsItem>,
  query: string,
): ProfileInsightsItem[] {
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

export function sortProfileInsights(
  items: ReadonlyArray<ProfileInsightsItem>,
  key: ProfileInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileInsightsItem[] {
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

export function describeProfileInsightsItem(item: ProfileInsightsItem): string {
  const amount = collectionPhone(item.amount);
  const name = collectionPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileInsightsAmount(amount: number): string {
  return collectionPhone(amount);
}

export function profileInsightsStatusTone(
  status: ProfileInsightsStatus,
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

export function pickProfileInsightsHighlights(
  items: ReadonlyArray<ProfileInsightsItem>,
  limit = 3,
): ProfileInsightsItem[] {
  return sortProfileInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
