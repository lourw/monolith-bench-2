import { collectionCode } from '../../../utils/collection/collection-code';
import { formatText } from '../../../utils/format/format-text';
import { asyncPercent } from '../../../utils/async/async-percent';
import {
  emptyReturnsWizardTotals,
  type ReturnsWizardItem,
  type ReturnsWizardStatus,
  type ReturnsWizardTotals,
} from './returns-wizard.model';

export type ReturnsWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsWizard(
  items: ReadonlyArray<ReturnsWizardItem>,
): ReturnsWizardTotals {
  const totals = emptyReturnsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsWizardByStatus(
  items: ReadonlyArray<ReturnsWizardItem>,
): Record<ReturnsWizardStatus, ReturnsWizardItem[]> {
  const grouped: Record<ReturnsWizardStatus, ReturnsWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsWizard(
  items: ReadonlyArray<ReturnsWizardItem>,
  query: string,
): ReturnsWizardItem[] {
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

export function sortReturnsWizard(
  items: ReadonlyArray<ReturnsWizardItem>,
  key: ReturnsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsWizardItem[] {
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

export function describeReturnsWizardItem(item: ReturnsWizardItem): string {
  const amount = collectionCode(item.amount);
  const name = asyncPercent(formatText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsWizardAmount(amount: number): string {
  return collectionCode(amount);
}

export function returnsWizardStatusTone(
  status: ReturnsWizardStatus,
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

export function pickReturnsWizardHighlights(
  items: ReadonlyArray<ReturnsWizardItem>,
  limit = 3,
): ReturnsWizardItem[] {
  return sortReturnsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
