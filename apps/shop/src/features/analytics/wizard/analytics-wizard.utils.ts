import { formatText } from '../../../utils/format/format-text';
import { storageCurrency } from '../../../utils/storage/storage-currency';
import {
  emptyAnalyticsWizardTotals,
  type AnalyticsWizardItem,
  type AnalyticsWizardStatus,
  type AnalyticsWizardTotals,
} from './analytics-wizard.model';

export type AnalyticsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAnalyticsWizard(
  items: ReadonlyArray<AnalyticsWizardItem>,
): AnalyticsWizardTotals {
  const totals = emptyAnalyticsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAnalyticsWizardByStatus(
  items: ReadonlyArray<AnalyticsWizardItem>,
): Record<AnalyticsWizardStatus, AnalyticsWizardItem[]> {
  const grouped: Record<AnalyticsWizardStatus, AnalyticsWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAnalyticsWizard(
  items: ReadonlyArray<AnalyticsWizardItem>,
  query: string,
): AnalyticsWizardItem[] {
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

export function sortAnalyticsWizard(
  items: ReadonlyArray<AnalyticsWizardItem>,
  key: AnalyticsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AnalyticsWizardItem[] {
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

export function describeAnalyticsWizardItem(item: AnalyticsWizardItem): string {
  const amount = formatText(item.amount);
  const name = storageCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAnalyticsWizardAmount(amount: number): string {
  return formatText(amount);
}

export function analyticsWizardStatusTone(
  status: AnalyticsWizardStatus,
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

export function pickAnalyticsWizardHighlights(
  items: ReadonlyArray<AnalyticsWizardItem>,
  limit = 3,
): AnalyticsWizardItem[] {
  return sortAnalyticsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
