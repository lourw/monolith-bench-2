import { formatPhone } from '../../../utils/format/format-phone';
import { asyncText } from '../../../utils/async/async-text';
import { collectionName } from '../../../utils/collection/collection-name';
import {
  emptyBundlesWizardTotals,
  type BundlesWizardItem,
  type BundlesWizardStatus,
  type BundlesWizardTotals,
} from './bundles-wizard.model';

export type BundlesWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesWizard(
  items: ReadonlyArray<BundlesWizardItem>,
): BundlesWizardTotals {
  const totals = emptyBundlesWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesWizardByStatus(
  items: ReadonlyArray<BundlesWizardItem>,
): Record<BundlesWizardStatus, BundlesWizardItem[]> {
  const grouped: Record<BundlesWizardStatus, BundlesWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesWizard(
  items: ReadonlyArray<BundlesWizardItem>,
  query: string,
): BundlesWizardItem[] {
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

export function sortBundlesWizard(
  items: ReadonlyArray<BundlesWizardItem>,
  key: BundlesWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesWizardItem[] {
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

export function describeBundlesWizardItem(item: BundlesWizardItem): string {
  const amount = formatPhone(item.amount);
  const name = collectionName(asyncText(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesWizardAmount(amount: number): string {
  return formatPhone(amount);
}

export function bundlesWizardStatusTone(
  status: BundlesWizardStatus,
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

export function pickBundlesWizardHighlights(
  items: ReadonlyArray<BundlesWizardItem>,
  limit = 3,
): BundlesWizardItem[] {
  return sortBundlesWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
