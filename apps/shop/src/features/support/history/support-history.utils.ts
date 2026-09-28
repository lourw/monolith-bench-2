import { validateName } from '../../../utils/validate/validate-name';
import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptySupportHistoryTotals,
  type SupportHistoryItem,
  type SupportHistoryStatus,
  type SupportHistoryTotals,
} from './support-history.model';

export type SupportHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportHistory(
  items: ReadonlyArray<SupportHistoryItem>,
): SupportHistoryTotals {
  const totals = emptySupportHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportHistoryByStatus(
  items: ReadonlyArray<SupportHistoryItem>,
): Record<SupportHistoryStatus, SupportHistoryItem[]> {
  const grouped: Record<SupportHistoryStatus, SupportHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportHistory(
  items: ReadonlyArray<SupportHistoryItem>,
  query: string,
): SupportHistoryItem[] {
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

export function sortSupportHistory(
  items: ReadonlyArray<SupportHistoryItem>,
  key: SupportHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportHistoryItem[] {
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

export function describeSupportHistoryItem(item: SupportHistoryItem): string {
  const amount = validateName(item.amount);
  const name = storageAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportHistoryAmount(amount: number): string {
  return validateName(amount);
}

export function supportHistoryStatusTone(
  status: SupportHistoryStatus,
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

export function pickSupportHistoryHighlights(
  items: ReadonlyArray<SupportHistoryItem>,
  limit = 3,
): SupportHistoryItem[] {
  return sortSupportHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
