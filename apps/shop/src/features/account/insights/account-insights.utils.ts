import { mathText } from '../../../utils/math/math-text';
import { mathPhone } from '../../../utils/math/math-phone';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import {
  emptyAccountInsightsTotals,
  type AccountInsightsItem,
  type AccountInsightsStatus,
  type AccountInsightsTotals,
} from './account-insights.model';

export type AccountInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountInsights(
  items: ReadonlyArray<AccountInsightsItem>,
): AccountInsightsTotals {
  const totals = emptyAccountInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountInsightsByStatus(
  items: ReadonlyArray<AccountInsightsItem>,
): Record<AccountInsightsStatus, AccountInsightsItem[]> {
  const grouped: Record<AccountInsightsStatus, AccountInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountInsights(
  items: ReadonlyArray<AccountInsightsItem>,
  query: string,
): AccountInsightsItem[] {
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

export function sortAccountInsights(
  items: ReadonlyArray<AccountInsightsItem>,
  key: AccountInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountInsightsItem[] {
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

export function describeAccountInsightsItem(item: AccountInsightsItem): string {
  const amount = mathText(item.amount);
  const name = i18nAddress(mathPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountInsightsAmount(amount: number): string {
  return mathText(amount);
}

export function accountInsightsStatusTone(
  status: AccountInsightsStatus,
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

export function pickAccountInsightsHighlights(
  items: ReadonlyArray<AccountInsightsItem>,
  limit = 3,
): AccountInsightsItem[] {
  return sortAccountInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
