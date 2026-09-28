import { mathCurrency } from '../../../utils/math/math-currency';
import {
  emptySupportWizardTotals,
  type SupportWizardItem,
  type SupportWizardStatus,
  type SupportWizardTotals,
} from './support-wizard.model';

export type SupportWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportWizard(
  items: ReadonlyArray<SupportWizardItem>,
): SupportWizardTotals {
  const totals = emptySupportWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportWizardByStatus(
  items: ReadonlyArray<SupportWizardItem>,
): Record<SupportWizardStatus, SupportWizardItem[]> {
  const grouped: Record<SupportWizardStatus, SupportWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportWizard(
  items: ReadonlyArray<SupportWizardItem>,
  query: string,
): SupportWizardItem[] {
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

export function sortSupportWizard(
  items: ReadonlyArray<SupportWizardItem>,
  key: SupportWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportWizardItem[] {
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

export function describeSupportWizardItem(item: SupportWizardItem): string {
  const amount = mathCurrency(item.amount);
  const name = mathCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportWizardAmount(amount: number): string {
  return mathCurrency(amount);
}

export function supportWizardStatusTone(
  status: SupportWizardStatus,
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

export function pickSupportWizardHighlights(
  items: ReadonlyArray<SupportWizardItem>,
  limit = 3,
): SupportWizardItem[] {
  return sortSupportWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
