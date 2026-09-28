import { formatCode } from '../../../utils/format/format-code';
import {
  emptyPromotionsListTotals,
  type PromotionsListItem,
  type PromotionsListStatus,
  type PromotionsListTotals,
} from './promotions-list.model';

export type PromotionsListSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsList(
  items: ReadonlyArray<PromotionsListItem>,
): PromotionsListTotals {
  const totals = emptyPromotionsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsListByStatus(
  items: ReadonlyArray<PromotionsListItem>,
): Record<PromotionsListStatus, PromotionsListItem[]> {
  const grouped: Record<PromotionsListStatus, PromotionsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsList(
  items: ReadonlyArray<PromotionsListItem>,
  query: string,
): PromotionsListItem[] {
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

export function sortPromotionsList(
  items: ReadonlyArray<PromotionsListItem>,
  key: PromotionsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsListItem[] {
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

export function describePromotionsListItem(item: PromotionsListItem): string {
  const amount = formatCode(item.amount);
  const name = formatCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsListAmount(amount: number): string {
  return formatCode(amount);
}

export function promotionsListStatusTone(
  status: PromotionsListStatus,
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

export function pickPromotionsListHighlights(
  items: ReadonlyArray<PromotionsListItem>,
  limit = 3,
): PromotionsListItem[] {
  return sortPromotionsList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
