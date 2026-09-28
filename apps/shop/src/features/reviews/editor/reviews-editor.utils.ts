import { mathPhone } from '../../../utils/math/math-phone';
import { formatCode } from '../../../utils/format/format-code';
import {
  emptyReviewsEditorTotals,
  type ReviewsEditorItem,
  type ReviewsEditorStatus,
  type ReviewsEditorTotals,
} from './reviews-editor.model';

export type ReviewsEditorSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReviewsEditor(
  items: ReadonlyArray<ReviewsEditorItem>,
): ReviewsEditorTotals {
  const totals = emptyReviewsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReviewsEditorByStatus(
  items: ReadonlyArray<ReviewsEditorItem>,
): Record<ReviewsEditorStatus, ReviewsEditorItem[]> {
  const grouped: Record<ReviewsEditorStatus, ReviewsEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReviewsEditor(
  items: ReadonlyArray<ReviewsEditorItem>,
  query: string,
): ReviewsEditorItem[] {
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

export function sortReviewsEditor(
  items: ReadonlyArray<ReviewsEditorItem>,
  key: ReviewsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReviewsEditorItem[] {
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

export function describeReviewsEditorItem(item: ReviewsEditorItem): string {
  const amount = mathPhone(item.amount);
  const name = formatCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReviewsEditorAmount(amount: number): string {
  return mathPhone(amount);
}

export function reviewsEditorStatusTone(
  status: ReviewsEditorStatus,
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

export function pickReviewsEditorHighlights(
  items: ReadonlyArray<ReviewsEditorItem>,
  limit = 3,
): ReviewsEditorItem[] {
  return sortReviewsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
