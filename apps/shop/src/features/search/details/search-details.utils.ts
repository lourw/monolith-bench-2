import { mathPhone } from '../../../utils/math/math-phone';
import {
  emptySearchDetailsTotals,
  type SearchDetailsItem,
  type SearchDetailsStatus,
  type SearchDetailsTotals,
} from './search-details.model';

export type SearchDetailsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchDetails(
  items: ReadonlyArray<SearchDetailsItem>,
): SearchDetailsTotals {
  const totals = emptySearchDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchDetailsByStatus(
  items: ReadonlyArray<SearchDetailsItem>,
): Record<SearchDetailsStatus, SearchDetailsItem[]> {
  const grouped: Record<SearchDetailsStatus, SearchDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchDetails(
  items: ReadonlyArray<SearchDetailsItem>,
  query: string,
): SearchDetailsItem[] {
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

export function sortSearchDetails(
  items: ReadonlyArray<SearchDetailsItem>,
  key: SearchDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchDetailsItem[] {
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

export function describeSearchDetailsItem(item: SearchDetailsItem): string {
  const amount = mathPhone(item.amount);
  const name = mathPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchDetailsAmount(amount: number): string {
  return mathPhone(amount);
}

export function searchDetailsStatusTone(
  status: SearchDetailsStatus,
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

export function pickSearchDetailsHighlights(
  items: ReadonlyArray<SearchDetailsItem>,
  limit = 3,
): SearchDetailsItem[] {
  return sortSearchDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
