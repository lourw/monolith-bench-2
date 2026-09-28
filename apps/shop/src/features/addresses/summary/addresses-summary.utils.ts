import { validateDate } from '../../../utils/validate/validate-date';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { asyncPercent } from '../../../utils/async/async-percent';
import {
  emptyAddressesSummaryTotals,
  type AddressesSummaryItem,
  type AddressesSummaryStatus,
  type AddressesSummaryTotals,
} from './addresses-summary.model';

export type AddressesSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesSummary(
  items: ReadonlyArray<AddressesSummaryItem>,
): AddressesSummaryTotals {
  const totals = emptyAddressesSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesSummaryByStatus(
  items: ReadonlyArray<AddressesSummaryItem>,
): Record<AddressesSummaryStatus, AddressesSummaryItem[]> {
  const grouped: Record<AddressesSummaryStatus, AddressesSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesSummary(
  items: ReadonlyArray<AddressesSummaryItem>,
  query: string,
): AddressesSummaryItem[] {
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

export function sortAddressesSummary(
  items: ReadonlyArray<AddressesSummaryItem>,
  key: AddressesSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesSummaryItem[] {
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

export function describeAddressesSummaryItem(
  item: AddressesSummaryItem,
): string {
  const amount = validateDate(item.amount);
  const name = asyncPercent(i18nAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesSummaryAmount(amount: number): string {
  return validateDate(amount);
}

export function addressesSummaryStatusTone(
  status: AddressesSummaryStatus,
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

export function pickAddressesSummaryHighlights(
  items: ReadonlyArray<AddressesSummaryItem>,
  limit = 3,
): AddressesSummaryItem[] {
  return sortAddressesSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
