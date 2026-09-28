import { mathPercent } from '../../../utils/math/math-percent';
import { formatName } from '../../../utils/format/format-name';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyRecommendationsEditorTotals,
  type RecommendationsEditorItem,
  type RecommendationsEditorStatus,
  type RecommendationsEditorTotals,
} from './recommendations-editor.model';

export type RecommendationsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalRecommendationsEditor(
  items: ReadonlyArray<RecommendationsEditorItem>,
): RecommendationsEditorTotals {
  const totals = emptyRecommendationsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupRecommendationsEditorByStatus(
  items: ReadonlyArray<RecommendationsEditorItem>,
): Record<RecommendationsEditorStatus, RecommendationsEditorItem[]> {
  const grouped: Record<
    RecommendationsEditorStatus,
    RecommendationsEditorItem[]
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

export function filterRecommendationsEditor(
  items: ReadonlyArray<RecommendationsEditorItem>,
  query: string,
): RecommendationsEditorItem[] {
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

export function sortRecommendationsEditor(
  items: ReadonlyArray<RecommendationsEditorItem>,
  key: RecommendationsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): RecommendationsEditorItem[] {
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

export function describeRecommendationsEditorItem(
  item: RecommendationsEditorItem,
): string {
  const amount = mathPercent(item.amount);
  const name = validateCode(formatName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatRecommendationsEditorAmount(amount: number): string {
  return mathPercent(amount);
}

export function recommendationsEditorStatusTone(
  status: RecommendationsEditorStatus,
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

export function pickRecommendationsEditorHighlights(
  items: ReadonlyArray<RecommendationsEditorItem>,
  limit = 3,
): RecommendationsEditorItem[] {
  return sortRecommendationsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
