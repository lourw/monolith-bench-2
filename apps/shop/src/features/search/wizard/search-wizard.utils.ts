import { validateNumber } from '../../../utils/validate/validate-number';
import { asyncName } from '../../../utils/async/async-name';
import {
  emptySearchWizardTotals,
  type SearchWizardItem,
  type SearchWizardStatus,
  type SearchWizardTotals,
} from './search-wizard.model';

export type SearchWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSearchWizard(
  items: ReadonlyArray<SearchWizardItem>,
): SearchWizardTotals {
  const totals = emptySearchWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSearchWizardByStatus(
  items: ReadonlyArray<SearchWizardItem>,
): Record<SearchWizardStatus, SearchWizardItem[]> {
  const grouped: Record<SearchWizardStatus, SearchWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSearchWizard(
  items: ReadonlyArray<SearchWizardItem>,
  query: string,
): SearchWizardItem[] {
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

export function sortSearchWizard(
  items: ReadonlyArray<SearchWizardItem>,
  key: SearchWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SearchWizardItem[] {
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

export function describeSearchWizardItem(item: SearchWizardItem): string {
  const amount = validateNumber(item.amount);
  const name = asyncName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSearchWizardAmount(amount: number): string {
  return validateNumber(amount);
}

export function searchWizardStatusTone(
  status: SearchWizardStatus,
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

export function pickSearchWizardHighlights(
  items: ReadonlyArray<SearchWizardItem>,
  limit = 3,
): SearchWizardItem[] {
  return sortSearchWizard(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
