import { collectionPercent } from '../../../utils/collection/collection-percent';
import {
  emptyProfileWizardTotals,
  type ProfileWizardItem,
  type ProfileWizardStatus,
  type ProfileWizardTotals,
} from './profile-wizard.model';

export type ProfileWizardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileWizard(
  items: ReadonlyArray<ProfileWizardItem>,
): ProfileWizardTotals {
  const totals = emptyProfileWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileWizardByStatus(
  items: ReadonlyArray<ProfileWizardItem>,
): Record<ProfileWizardStatus, ProfileWizardItem[]> {
  const grouped: Record<ProfileWizardStatus, ProfileWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileWizard(
  items: ReadonlyArray<ProfileWizardItem>,
  query: string,
): ProfileWizardItem[] {
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

export function sortProfileWizard(
  items: ReadonlyArray<ProfileWizardItem>,
  key: ProfileWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileWizardItem[] {
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

export function describeProfileWizardItem(item: ProfileWizardItem): string {
  const amount = collectionPercent(item.amount);
  const name = collectionPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileWizardAmount(amount: number): string {
  return collectionPercent(amount);
}

export function profileWizardStatusTone(
  status: ProfileWizardStatus,
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

export function pickProfileWizardHighlights(
  items: ReadonlyArray<ProfileWizardItem>,
  limit = 3,
): ProfileWizardItem[] {
  return sortProfileWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
