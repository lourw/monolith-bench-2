import { i18nDate } from '../../../utils/i18n/i18n-date';
import { asyncCurrency } from '../../../utils/async/async-currency';
import { validatePhone } from '../../../utils/validate/validate-phone';
import {
  emptyPreordersListTotals,
  type PreordersListItem,
  type PreordersListStatus,
  type PreordersListTotals,
} from './preorders-list.model';

export type PreordersListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersList(
  items: ReadonlyArray<PreordersListItem>,
): PreordersListTotals {
  const totals = emptyPreordersListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersListByStatus(
  items: ReadonlyArray<PreordersListItem>,
): Record<PreordersListStatus, PreordersListItem[]> {
  const grouped: Record<PreordersListStatus, PreordersListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersList(
  items: ReadonlyArray<PreordersListItem>,
  query: string,
): PreordersListItem[] {
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

export function sortPreordersList(
  items: ReadonlyArray<PreordersListItem>,
  key: PreordersListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersListItem[] {
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

export function describePreordersListItem(item: PreordersListItem): string {
  const amount = i18nDate(item.amount);
  const name = validatePhone(asyncCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersListAmount(amount: number): string {
  return i18nDate(amount);
}

export function preordersListStatusTone(
  status: PreordersListStatus,
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

export function pickPreordersListHighlights(
  items: ReadonlyArray<PreordersListItem>,
  limit = 3,
): PreordersListItem[] {
  return sortPreordersList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
