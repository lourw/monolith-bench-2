import { i18nName } from '../../../utils/i18n/i18n-name';
import { validateAddress } from '../../../utils/validate/validate-address';
import { asyncPhone } from '../../../utils/async/async-phone';
import {
  emptyFeedbackEditorTotals,
  type FeedbackEditorItem,
  type FeedbackEditorStatus,
  type FeedbackEditorTotals,
} from './feedback-editor.model';

export type FeedbackEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalFeedbackEditor(
  items: ReadonlyArray<FeedbackEditorItem>,
): FeedbackEditorTotals {
  const totals = emptyFeedbackEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupFeedbackEditorByStatus(
  items: ReadonlyArray<FeedbackEditorItem>,
): Record<FeedbackEditorStatus, FeedbackEditorItem[]> {
  const grouped: Record<FeedbackEditorStatus, FeedbackEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterFeedbackEditor(
  items: ReadonlyArray<FeedbackEditorItem>,
  query: string,
): FeedbackEditorItem[] {
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

export function sortFeedbackEditor(
  items: ReadonlyArray<FeedbackEditorItem>,
  key: FeedbackEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): FeedbackEditorItem[] {
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

export function describeFeedbackEditorItem(item: FeedbackEditorItem): string {
  const amount = i18nName(item.amount);
  const name = asyncPhone(validateAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatFeedbackEditorAmount(amount: number): string {
  return i18nName(amount);
}

export function feedbackEditorStatusTone(
  status: FeedbackEditorStatus,
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

export function pickFeedbackEditorHighlights(
  items: ReadonlyArray<FeedbackEditorItem>,
  limit = 3,
): FeedbackEditorItem[] {
  return sortFeedbackEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
