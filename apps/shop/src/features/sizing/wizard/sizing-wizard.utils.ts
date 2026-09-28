import { formatCurrency } from '../../../utils/format/format-currency';
import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptySizingWizardTotals,
  type SizingWizardItem,
  type SizingWizardStatus,
  type SizingWizardTotals,
} from './sizing-wizard.model';

export type SizingWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingWizard(
  items: ReadonlyArray<SizingWizardItem>,
): SizingWizardTotals {
  const totals = emptySizingWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingWizardByStatus(
  items: ReadonlyArray<SizingWizardItem>,
): Record<SizingWizardStatus, SizingWizardItem[]> {
  const grouped: Record<SizingWizardStatus, SizingWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingWizard(
  items: ReadonlyArray<SizingWizardItem>,
  query: string,
): SizingWizardItem[] {
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

export function sortSizingWizard(
  items: ReadonlyArray<SizingWizardItem>,
  key: SizingWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingWizardItem[] {
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

export function describeSizingWizardItem(item: SizingWizardItem): string {
  const amount = formatCurrency(item.amount);
  const name = storageAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingWizardAmount(amount: number): string {
  return formatCurrency(amount);
}

export function sizingWizardStatusTone(
  status: SizingWizardStatus,
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

export function pickSizingWizardHighlights(
  items: ReadonlyArray<SizingWizardItem>,
  limit = 3,
): SizingWizardItem[] {
  return sortSizingWizard(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
