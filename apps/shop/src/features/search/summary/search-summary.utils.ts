import { collectionPhone } from '../../../utils/collection/collection-phone';
import { mathNumber } from '../../../utils/math/math-number';
import { mathCode } from '../../../utils/math/math-code';
import {
  emptySearchSummaryTotals,
  type SearchSummaryItem,
  type SearchSummaryStatus,
  type SearchSummaryTotals,
} from './search-summary.model';

export type SearchSummarySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchSummary(
  items: ReadonlyArray<SearchSummaryItem>,
): SearchSummaryTotals {
  const totals = emptySearchSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchSummaryByStatus(
  items: ReadonlyArray<SearchSummaryItem>,
): Record<SearchSummaryStatus, SearchSummaryItem[]> {
  const grouped: Record<SearchSummaryStatus, SearchSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchSummary(
  items: ReadonlyArray<SearchSummaryItem>,
  query: string,
): SearchSummaryItem[] {
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

export function sortSearchSummary(
  items: ReadonlyArray<SearchSummaryItem>,
  key: SearchSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchSummaryItem[] {
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

export function describeSearchSummaryItem(item: SearchSummaryItem): string {
  const amount = collectionPhone(item.amount);
  const name = mathCode(mathNumber(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchSummaryAmount(amount: number): string {
  return collectionPhone(amount);
}

export function searchSummaryStatusTone(
  status: SearchSummaryStatus,
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

export function pickSearchSummaryHighlights(
  items: ReadonlyArray<SearchSummaryItem>,
  limit = 3,
): SearchSummaryItem[] {
  return sortSearchSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
