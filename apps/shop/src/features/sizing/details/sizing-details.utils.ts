import { i18nCode } from '../../../utils/i18n/i18n-code';
import { formatPhone } from '../../../utils/format/format-phone';
import {
  emptySizingDetailsTotals,
  type SizingDetailsItem,
  type SizingDetailsStatus,
  type SizingDetailsTotals,
} from './sizing-details.model';

export type SizingDetailsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingDetails(
  items: ReadonlyArray<SizingDetailsItem>,
): SizingDetailsTotals {
  const totals = emptySizingDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingDetailsByStatus(
  items: ReadonlyArray<SizingDetailsItem>,
): Record<SizingDetailsStatus, SizingDetailsItem[]> {
  const grouped: Record<SizingDetailsStatus, SizingDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingDetails(
  items: ReadonlyArray<SizingDetailsItem>,
  query: string,
): SizingDetailsItem[] {
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

export function sortSizingDetails(
  items: ReadonlyArray<SizingDetailsItem>,
  key: SizingDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingDetailsItem[] {
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

export function describeSizingDetailsItem(item: SizingDetailsItem): string {
  const amount = i18nCode(item.amount);
  const name = formatPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingDetailsAmount(amount: number): string {
  return i18nCode(amount);
}

export function sizingDetailsStatusTone(
  status: SizingDetailsStatus,
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

export function pickSizingDetailsHighlights(
  items: ReadonlyArray<SizingDetailsItem>,
  limit = 3,
): SizingDetailsItem[] {
  return sortSizingDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
