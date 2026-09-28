import { mathCode } from '../../../utils/math/math-code';
import { i18nCurrency } from '../../../utils/i18n/i18n-currency';
import {
  emptyProfileHistoryTotals,
  type ProfileHistoryItem,
  type ProfileHistoryStatus,
  type ProfileHistoryTotals,
} from './profile-history.model';

export type ProfileHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileHistory(
  items: ReadonlyArray<ProfileHistoryItem>,
): ProfileHistoryTotals {
  const totals = emptyProfileHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileHistoryByStatus(
  items: ReadonlyArray<ProfileHistoryItem>,
): Record<ProfileHistoryStatus, ProfileHistoryItem[]> {
  const grouped: Record<ProfileHistoryStatus, ProfileHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileHistory(
  items: ReadonlyArray<ProfileHistoryItem>,
  query: string,
): ProfileHistoryItem[] {
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

export function sortProfileHistory(
  items: ReadonlyArray<ProfileHistoryItem>,
  key: ProfileHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileHistoryItem[] {
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

export function describeProfileHistoryItem(item: ProfileHistoryItem): string {
  const amount = mathCode(item.amount);
  const name = i18nCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileHistoryAmount(amount: number): string {
  return mathCode(amount);
}

export function profileHistoryStatusTone(
  status: ProfileHistoryStatus,
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

export function pickProfileHistoryHighlights(
  items: ReadonlyArray<ProfileHistoryItem>,
  limit = 3,
): ProfileHistoryItem[] {
  return sortProfileHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
