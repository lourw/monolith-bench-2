import { collectionCode } from '../../../utils/collection/collection-code';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyCompareListTotals,
  type CompareListItem,
  type CompareListStatus,
  type CompareListTotals,
} from './compare-list.model';

export type CompareListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareList(
  items: ReadonlyArray<CompareListItem>,
): CompareListTotals {
  const totals = emptyCompareListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareListByStatus(
  items: ReadonlyArray<CompareListItem>,
): Record<CompareListStatus, CompareListItem[]> {
  const grouped: Record<CompareListStatus, CompareListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareList(
  items: ReadonlyArray<CompareListItem>,
  query: string,
): CompareListItem[] {
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

export function sortCompareList(
  items: ReadonlyArray<CompareListItem>,
  key: CompareListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareListItem[] {
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

export function describeCompareListItem(item: CompareListItem): string {
  const amount = collectionCode(item.amount);
  const name = validateName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareListAmount(amount: number): string {
  return collectionCode(amount);
}

export function compareListStatusTone(
  status: CompareListStatus,
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

export function pickCompareListHighlights(
  items: ReadonlyArray<CompareListItem>,
  limit = 3,
): CompareListItem[] {
  return sortCompareList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
