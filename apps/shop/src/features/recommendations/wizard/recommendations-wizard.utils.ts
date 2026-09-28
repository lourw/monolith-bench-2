import { collectionPhone } from '../../../utils/collection/collection-phone';
import { mathPercent } from '../../../utils/math/math-percent';
import {
  emptyRecommendationsWizardTotals,
  type RecommendationsWizardItem,
  type RecommendationsWizardStatus,
  type RecommendationsWizardTotals,
} from './recommendations-wizard.model';

export type RecommendationsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsWizard(
  items: ReadonlyArray<RecommendationsWizardItem>,
): RecommendationsWizardTotals {
  const totals = emptyRecommendationsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsWizardByStatus(
  items: ReadonlyArray<RecommendationsWizardItem>,
): Record<RecommendationsWizardStatus, RecommendationsWizardItem[]> {
  const grouped: Record<
    RecommendationsWizardStatus,
    RecommendationsWizardItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterRecommendationsWizard(
  items: ReadonlyArray<RecommendationsWizardItem>,
  query: string,
): RecommendationsWizardItem[] {
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

export function sortRecommendationsWizard(
  items: ReadonlyArray<RecommendationsWizardItem>,
  key: RecommendationsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsWizardItem[] {
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

export function describeRecommendationsWizardItem(
  item: RecommendationsWizardItem,
): string {
  const amount = collectionPhone(item.amount);
  const name = mathPercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsWizardAmount(amount: number): string {
  return collectionPhone(amount);
}

export function recommendationsWizardStatusTone(
  status: RecommendationsWizardStatus,
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

export function pickRecommendationsWizardHighlights(
  items: ReadonlyArray<RecommendationsWizardItem>,
  limit = 3,
): RecommendationsWizardItem[] {
  return sortRecommendationsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
