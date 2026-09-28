import { collectionName } from '../../../utils/collection/collection-name';
import { validateSlug } from '../../../utils/validate/validate-slug';
import { asyncCurrency } from '../../../utils/async/async-currency';
import {
  emptyPreordersSummaryTotals,
  type PreordersSummaryItem,
  type PreordersSummaryStatus,
  type PreordersSummaryTotals,
} from './preorders-summary.model';

export type PreordersSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersSummary(
  items: ReadonlyArray<PreordersSummaryItem>,
): PreordersSummaryTotals {
  const totals = emptyPreordersSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersSummaryByStatus(
  items: ReadonlyArray<PreordersSummaryItem>,
): Record<PreordersSummaryStatus, PreordersSummaryItem[]> {
  const grouped: Record<PreordersSummaryStatus, PreordersSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersSummary(
  items: ReadonlyArray<PreordersSummaryItem>,
  query: string,
): PreordersSummaryItem[] {
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

export function sortPreordersSummary(
  items: ReadonlyArray<PreordersSummaryItem>,
  key: PreordersSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersSummaryItem[] {
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

export function describePreordersSummaryItem(
  item: PreordersSummaryItem,
): string {
  const amount = collectionName(item.amount);
  const name = asyncCurrency(validateSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersSummaryAmount(amount: number): string {
  return collectionName(amount);
}

export function preordersSummaryStatusTone(
  status: PreordersSummaryStatus,
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

export function pickPreordersSummaryHighlights(
  items: ReadonlyArray<PreordersSummaryItem>,
  limit = 3,
): PreordersSummaryItem[] {
  return sortPreordersSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
