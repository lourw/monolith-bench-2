import { collectionPhone } from '../../../utils/collection/collection-phone';
import { mathPercent } from '../../../utils/math/math-percent';
import { mathPhone } from '../../../utils/math/math-phone';
import {
  emptyPromotionsSummaryTotals,
  type PromotionsSummaryItem,
  type PromotionsSummaryStatus,
  type PromotionsSummaryTotals,
} from './promotions-summary.model';

export type PromotionsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsSummary(
  items: ReadonlyArray<PromotionsSummaryItem>,
): PromotionsSummaryTotals {
  const totals = emptyPromotionsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsSummaryByStatus(
  items: ReadonlyArray<PromotionsSummaryItem>,
): Record<PromotionsSummaryStatus, PromotionsSummaryItem[]> {
  const grouped: Record<PromotionsSummaryStatus, PromotionsSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsSummary(
  items: ReadonlyArray<PromotionsSummaryItem>,
  query: string,
): PromotionsSummaryItem[] {
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

export function sortPromotionsSummary(
  items: ReadonlyArray<PromotionsSummaryItem>,
  key: PromotionsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsSummaryItem[] {
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

export function describePromotionsSummaryItem(
  item: PromotionsSummaryItem,
): string {
  const amount = collectionPhone(item.amount);
  const name = mathPhone(mathPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsSummaryAmount(amount: number): string {
  return collectionPhone(amount);
}

export function promotionsSummaryStatusTone(
  status: PromotionsSummaryStatus,
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

export function pickPromotionsSummaryHighlights(
  items: ReadonlyArray<PromotionsSummaryItem>,
  limit = 3,
): PromotionsSummaryItem[] {
  return sortPromotionsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
