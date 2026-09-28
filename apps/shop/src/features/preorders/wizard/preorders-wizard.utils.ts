import { storagePercent } from '../../../utils/storage/storage-percent';
import { i18nText } from '../../../utils/i18n/i18n-text';
import {
  emptyPreordersWizardTotals,
  type PreordersWizardItem,
  type PreordersWizardStatus,
  type PreordersWizardTotals,
} from './preorders-wizard.model';

export type PreordersWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersWizard(
  items: ReadonlyArray<PreordersWizardItem>,
): PreordersWizardTotals {
  const totals = emptyPreordersWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersWizardByStatus(
  items: ReadonlyArray<PreordersWizardItem>,
): Record<PreordersWizardStatus, PreordersWizardItem[]> {
  const grouped: Record<PreordersWizardStatus, PreordersWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersWizard(
  items: ReadonlyArray<PreordersWizardItem>,
  query: string,
): PreordersWizardItem[] {
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

export function sortPreordersWizard(
  items: ReadonlyArray<PreordersWizardItem>,
  key: PreordersWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersWizardItem[] {
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

export function describePreordersWizardItem(item: PreordersWizardItem): string {
  const amount = storagePercent(item.amount);
  const name = i18nText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersWizardAmount(amount: number): string {
  return storagePercent(amount);
}

export function preordersWizardStatusTone(
  status: PreordersWizardStatus,
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

export function pickPreordersWizardHighlights(
  items: ReadonlyArray<PreordersWizardItem>,
  limit = 3,
): PreordersWizardItem[] {
  return sortPreordersWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
