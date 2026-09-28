import { asyncNumber } from '../../../utils/async/async-number';
import {
  emptyLoyaltyHistoryTotals,
  type LoyaltyHistoryItem,
  type LoyaltyHistoryStatus,
  type LoyaltyHistoryTotals,
} from './loyalty-history.model';

export type LoyaltyHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyHistory(
  items: ReadonlyArray<LoyaltyHistoryItem>,
): LoyaltyHistoryTotals {
  const totals = emptyLoyaltyHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyHistoryByStatus(
  items: ReadonlyArray<LoyaltyHistoryItem>,
): Record<LoyaltyHistoryStatus, LoyaltyHistoryItem[]> {
  const grouped: Record<LoyaltyHistoryStatus, LoyaltyHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyHistory(
  items: ReadonlyArray<LoyaltyHistoryItem>,
  query: string,
): LoyaltyHistoryItem[] {
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

export function sortLoyaltyHistory(
  items: ReadonlyArray<LoyaltyHistoryItem>,
  key: LoyaltyHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyHistoryItem[] {
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

export function describeLoyaltyHistoryItem(item: LoyaltyHistoryItem): string {
  const amount = asyncNumber(item.amount);
  const name = asyncNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyHistoryAmount(amount: number): string {
  return asyncNumber(amount);
}

export function loyaltyHistoryStatusTone(
  status: LoyaltyHistoryStatus,
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

export function pickLoyaltyHistoryHighlights(
  items: ReadonlyArray<LoyaltyHistoryItem>,
  limit = 3,
): LoyaltyHistoryItem[] {
  return sortLoyaltyHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
