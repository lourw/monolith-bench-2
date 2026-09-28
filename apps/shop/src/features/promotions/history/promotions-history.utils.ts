import { mathCurrency } from '../../../utils/math/math-currency';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyPromotionsHistoryTotals,
  type PromotionsHistoryItem,
  type PromotionsHistoryStatus,
  type PromotionsHistoryTotals,
} from './promotions-history.model';

export type PromotionsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsHistory(
  items: ReadonlyArray<PromotionsHistoryItem>,
): PromotionsHistoryTotals {
  const totals = emptyPromotionsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsHistoryByStatus(
  items: ReadonlyArray<PromotionsHistoryItem>,
): Record<PromotionsHistoryStatus, PromotionsHistoryItem[]> {
  const grouped: Record<PromotionsHistoryStatus, PromotionsHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsHistory(
  items: ReadonlyArray<PromotionsHistoryItem>,
  query: string,
): PromotionsHistoryItem[] {
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

export function sortPromotionsHistory(
  items: ReadonlyArray<PromotionsHistoryItem>,
  key: PromotionsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsHistoryItem[] {
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

export function describePromotionsHistoryItem(
  item: PromotionsHistoryItem,
): string {
  const amount = mathCurrency(item.amount);
  const name = validateCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsHistoryAmount(amount: number): string {
  return mathCurrency(amount);
}

export function promotionsHistoryStatusTone(
  status: PromotionsHistoryStatus,
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

export function pickPromotionsHistoryHighlights(
  items: ReadonlyArray<PromotionsHistoryItem>,
  limit = 3,
): PromotionsHistoryItem[] {
  return sortPromotionsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
