import { formatPercent } from '../../../utils/format/format-percent';
import { collectionName } from '../../../utils/collection/collection-name';
import {
  emptySupportDashboardTotals,
  type SupportDashboardItem,
  type SupportDashboardStatus,
  type SupportDashboardTotals,
} from './support-dashboard.model';

export type SupportDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportDashboard(
  items: ReadonlyArray<SupportDashboardItem>,
): SupportDashboardTotals {
  const totals = emptySupportDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportDashboardByStatus(
  items: ReadonlyArray<SupportDashboardItem>,
): Record<SupportDashboardStatus, SupportDashboardItem[]> {
  const grouped: Record<SupportDashboardStatus, SupportDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportDashboard(
  items: ReadonlyArray<SupportDashboardItem>,
  query: string,
): SupportDashboardItem[] {
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

export function sortSupportDashboard(
  items: ReadonlyArray<SupportDashboardItem>,
  key: SupportDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportDashboardItem[] {
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

export function describeSupportDashboardItem(
  item: SupportDashboardItem,
): string {
  const amount = formatPercent(item.amount);
  const name = collectionName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportDashboardAmount(amount: number): string {
  return formatPercent(amount);
}

export function supportDashboardStatusTone(
  status: SupportDashboardStatus,
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

export function pickSupportDashboardHighlights(
  items: ReadonlyArray<SupportDashboardItem>,
  limit = 3,
): SupportDashboardItem[] {
  return sortSupportDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
