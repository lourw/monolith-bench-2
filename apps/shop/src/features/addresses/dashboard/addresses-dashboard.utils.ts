import { storageSlug } from '../../../utils/storage/storage-slug';
import { mathSlug } from '../../../utils/math/math-slug';
import {
  emptyAddressesDashboardTotals,
  type AddressesDashboardItem,
  type AddressesDashboardStatus,
  type AddressesDashboardTotals,
} from './addresses-dashboard.model';

export type AddressesDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesDashboard(
  items: ReadonlyArray<AddressesDashboardItem>,
): AddressesDashboardTotals {
  const totals = emptyAddressesDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesDashboardByStatus(
  items: ReadonlyArray<AddressesDashboardItem>,
): Record<AddressesDashboardStatus, AddressesDashboardItem[]> {
  const grouped: Record<AddressesDashboardStatus, AddressesDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesDashboard(
  items: ReadonlyArray<AddressesDashboardItem>,
  query: string,
): AddressesDashboardItem[] {
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

export function sortAddressesDashboard(
  items: ReadonlyArray<AddressesDashboardItem>,
  key: AddressesDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesDashboardItem[] {
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

export function describeAddressesDashboardItem(
  item: AddressesDashboardItem,
): string {
  const amount = storageSlug(item.amount);
  const name = mathSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesDashboardAmount(amount: number): string {
  return storageSlug(amount);
}

export function addressesDashboardStatusTone(
  status: AddressesDashboardStatus,
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

export function pickAddressesDashboardHighlights(
  items: ReadonlyArray<AddressesDashboardItem>,
  limit = 3,
): AddressesDashboardItem[] {
  return sortAddressesDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
