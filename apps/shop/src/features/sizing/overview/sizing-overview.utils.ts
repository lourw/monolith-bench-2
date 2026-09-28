import { formatPercent } from '../../../utils/format/format-percent';
import { formatText } from '../../../utils/format/format-text';
import {
  emptySizingOverviewTotals,
  type SizingOverviewItem,
  type SizingOverviewStatus,
  type SizingOverviewTotals,
} from './sizing-overview.model';

export type SizingOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingOverview(
  items: ReadonlyArray<SizingOverviewItem>,
): SizingOverviewTotals {
  const totals = emptySizingOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingOverviewByStatus(
  items: ReadonlyArray<SizingOverviewItem>,
): Record<SizingOverviewStatus, SizingOverviewItem[]> {
  const grouped: Record<SizingOverviewStatus, SizingOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingOverview(
  items: ReadonlyArray<SizingOverviewItem>,
  query: string,
): SizingOverviewItem[] {
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

export function sortSizingOverview(
  items: ReadonlyArray<SizingOverviewItem>,
  key: SizingOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingOverviewItem[] {
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

export function describeSizingOverviewItem(item: SizingOverviewItem): string {
  const amount = formatPercent(item.amount);
  const name = formatText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingOverviewAmount(amount: number): string {
  return formatPercent(amount);
}

export function sizingOverviewStatusTone(
  status: SizingOverviewStatus,
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

export function pickSizingOverviewHighlights(
  items: ReadonlyArray<SizingOverviewItem>,
  limit = 3,
): SizingOverviewItem[] {
  return sortSizingOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
