import { formatNumber } from '../../../utils/format/format-number';
import {
  emptyProfileDashboardTotals,
  type ProfileDashboardItem,
  type ProfileDashboardStatus,
  type ProfileDashboardTotals,
} from './profile-dashboard.model';

export type ProfileDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileDashboard(
  items: ReadonlyArray<ProfileDashboardItem>,
): ProfileDashboardTotals {
  const totals = emptyProfileDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileDashboardByStatus(
  items: ReadonlyArray<ProfileDashboardItem>,
): Record<ProfileDashboardStatus, ProfileDashboardItem[]> {
  const grouped: Record<ProfileDashboardStatus, ProfileDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileDashboard(
  items: ReadonlyArray<ProfileDashboardItem>,
  query: string,
): ProfileDashboardItem[] {
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

export function sortProfileDashboard(
  items: ReadonlyArray<ProfileDashboardItem>,
  key: ProfileDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileDashboardItem[] {
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

export function describeProfileDashboardItem(
  item: ProfileDashboardItem,
): string {
  const amount = formatNumber(item.amount);
  const name = formatNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileDashboardAmount(amount: number): string {
  return formatNumber(amount);
}

export function profileDashboardStatusTone(
  status: ProfileDashboardStatus,
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

export function pickProfileDashboardHighlights(
  items: ReadonlyArray<ProfileDashboardItem>,
  limit = 3,
): ProfileDashboardItem[] {
  return sortProfileDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
