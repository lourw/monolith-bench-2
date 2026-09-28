import { validatePhone } from '../../../utils/validate/validate-phone';
import { asyncText } from '../../../utils/async/async-text';
import {
  emptyReviewsSettingsTotals,
  type ReviewsSettingsItem,
  type ReviewsSettingsStatus,
  type ReviewsSettingsTotals,
} from './reviews-settings.model';

export type ReviewsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsSettings(
  items: ReadonlyArray<ReviewsSettingsItem>,
): ReviewsSettingsTotals {
  const totals = emptyReviewsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsSettingsByStatus(
  items: ReadonlyArray<ReviewsSettingsItem>,
): Record<ReviewsSettingsStatus, ReviewsSettingsItem[]> {
  const grouped: Record<ReviewsSettingsStatus, ReviewsSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsSettings(
  items: ReadonlyArray<ReviewsSettingsItem>,
  query: string,
): ReviewsSettingsItem[] {
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

export function sortReviewsSettings(
  items: ReadonlyArray<ReviewsSettingsItem>,
  key: ReviewsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsSettingsItem[] {
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

export function describeReviewsSettingsItem(item: ReviewsSettingsItem): string {
  const amount = validatePhone(item.amount);
  const name = asyncText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsSettingsAmount(amount: number): string {
  return validatePhone(amount);
}

export function reviewsSettingsStatusTone(
  status: ReviewsSettingsStatus,
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

export function pickReviewsSettingsHighlights(
  items: ReadonlyArray<ReviewsSettingsItem>,
  limit = 3,
): ReviewsSettingsItem[] {
  return sortReviewsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
