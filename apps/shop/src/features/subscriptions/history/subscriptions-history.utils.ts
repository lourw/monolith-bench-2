import { validateText } from '../../../utils/validate/validate-text';
import {
  emptySubscriptionsHistoryTotals,
  type SubscriptionsHistoryItem,
  type SubscriptionsHistoryStatus,
  type SubscriptionsHistoryTotals,
} from './subscriptions-history.model';

export type SubscriptionsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsHistory(
  items: ReadonlyArray<SubscriptionsHistoryItem>,
): SubscriptionsHistoryTotals {
  const totals = emptySubscriptionsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsHistoryByStatus(
  items: ReadonlyArray<SubscriptionsHistoryItem>,
): Record<SubscriptionsHistoryStatus, SubscriptionsHistoryItem[]> {
  const grouped: Record<
    SubscriptionsHistoryStatus,
    SubscriptionsHistoryItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSubscriptionsHistory(
  items: ReadonlyArray<SubscriptionsHistoryItem>,
  query: string,
): SubscriptionsHistoryItem[] {
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

export function sortSubscriptionsHistory(
  items: ReadonlyArray<SubscriptionsHistoryItem>,
  key: SubscriptionsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsHistoryItem[] {
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

export function describeSubscriptionsHistoryItem(
  item: SubscriptionsHistoryItem,
): string {
  const amount = validateText(item.amount);
  const name = validateText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsHistoryAmount(amount: number): string {
  return validateText(amount);
}

export function subscriptionsHistoryStatusTone(
  status: SubscriptionsHistoryStatus,
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

export function pickSubscriptionsHistoryHighlights(
  items: ReadonlyArray<SubscriptionsHistoryItem>,
  limit = 3,
): SubscriptionsHistoryItem[] {
  return sortSubscriptionsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
