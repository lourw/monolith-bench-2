import { asyncCode } from '../../../utils/async/async-code';
import { storageSlug } from '../../../utils/storage/storage-slug';
import {
  emptyFeedbackWizardTotals,
  type FeedbackWizardItem,
  type FeedbackWizardStatus,
  type FeedbackWizardTotals,
} from './feedback-wizard.model';

export type FeedbackWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackWizard(
  items: ReadonlyArray<FeedbackWizardItem>,
): FeedbackWizardTotals {
  const totals = emptyFeedbackWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackWizardByStatus(
  items: ReadonlyArray<FeedbackWizardItem>,
): Record<FeedbackWizardStatus, FeedbackWizardItem[]> {
  const grouped: Record<FeedbackWizardStatus, FeedbackWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackWizard(
  items: ReadonlyArray<FeedbackWizardItem>,
  query: string,
): FeedbackWizardItem[] {
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

export function sortFeedbackWizard(
  items: ReadonlyArray<FeedbackWizardItem>,
  key: FeedbackWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackWizardItem[] {
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

export function describeFeedbackWizardItem(item: FeedbackWizardItem): string {
  const amount = asyncCode(item.amount);
  const name = storageSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackWizardAmount(amount: number): string {
  return asyncCode(amount);
}

export function feedbackWizardStatusTone(
  status: FeedbackWizardStatus,
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

export function pickFeedbackWizardHighlights(
  items: ReadonlyArray<FeedbackWizardItem>,
  limit = 3,
): FeedbackWizardItem[] {
  return sortFeedbackWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
