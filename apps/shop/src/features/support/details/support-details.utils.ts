import { collectionCode } from '../../../utils/collection/collection-code';
import { storagePercent } from '../../../utils/storage/storage-percent';
import { validateText } from '../../../utils/validate/validate-text';
import {
  emptySupportDetailsTotals,
  type SupportDetailsItem,
  type SupportDetailsStatus,
  type SupportDetailsTotals,
} from './support-details.model';

export type SupportDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportDetails(
  items: ReadonlyArray<SupportDetailsItem>,
): SupportDetailsTotals {
  const totals = emptySupportDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportDetailsByStatus(
  items: ReadonlyArray<SupportDetailsItem>,
): Record<SupportDetailsStatus, SupportDetailsItem[]> {
  const grouped: Record<SupportDetailsStatus, SupportDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportDetails(
  items: ReadonlyArray<SupportDetailsItem>,
  query: string,
): SupportDetailsItem[] {
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

export function sortSupportDetails(
  items: ReadonlyArray<SupportDetailsItem>,
  key: SupportDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportDetailsItem[] {
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

export function describeSupportDetailsItem(item: SupportDetailsItem): string {
  const amount = collectionCode(item.amount);
  const name = validateText(storagePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportDetailsAmount(amount: number): string {
  return collectionCode(amount);
}

export function supportDetailsStatusTone(
  status: SupportDetailsStatus,
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

export function pickSupportDetailsHighlights(
  items: ReadonlyArray<SupportDetailsItem>,
  limit = 3,
): SupportDetailsItem[] {
  return sortSupportDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
