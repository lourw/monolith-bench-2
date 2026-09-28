import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import { asyncPhone } from '../../../utils/async/async-phone';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import {
  emptyCompareWizardTotals,
  type CompareWizardItem,
  type CompareWizardStatus,
  type CompareWizardTotals,
} from './compare-wizard.model';

export type CompareWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareWizard(
  items: ReadonlyArray<CompareWizardItem>,
): CompareWizardTotals {
  const totals = emptyCompareWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareWizardByStatus(
  items: ReadonlyArray<CompareWizardItem>,
): Record<CompareWizardStatus, CompareWizardItem[]> {
  const grouped: Record<CompareWizardStatus, CompareWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareWizard(
  items: ReadonlyArray<CompareWizardItem>,
  query: string,
): CompareWizardItem[] {
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

export function sortCompareWizard(
  items: ReadonlyArray<CompareWizardItem>,
  key: CompareWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareWizardItem[] {
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

export function describeCompareWizardItem(item: CompareWizardItem): string {
  const amount = i18nPercent(item.amount);
  const name = i18nAddress(asyncPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareWizardAmount(amount: number): string {
  return i18nPercent(amount);
}

export function compareWizardStatusTone(
  status: CompareWizardStatus,
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

export function pickCompareWizardHighlights(
  items: ReadonlyArray<CompareWizardItem>,
  limit = 3,
): CompareWizardItem[] {
  return sortCompareWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
