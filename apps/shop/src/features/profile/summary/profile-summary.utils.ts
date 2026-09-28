import { formatSlug } from '../../../utils/format/format-slug';
import { collectionCode } from '../../../utils/collection/collection-code';
import { storageText } from '../../../utils/storage/storage-text';
import {
  emptyProfileSummaryTotals,
  type ProfileSummaryItem,
  type ProfileSummaryStatus,
  type ProfileSummaryTotals,
} from './profile-summary.model';

export type ProfileSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalProfileSummary(
  items: ReadonlyArray<ProfileSummaryItem>,
): ProfileSummaryTotals {
  const totals = emptyProfileSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupProfileSummaryByStatus(
  items: ReadonlyArray<ProfileSummaryItem>,
): Record<ProfileSummaryStatus, ProfileSummaryItem[]> {
  const grouped: Record<ProfileSummaryStatus, ProfileSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterProfileSummary(
  items: ReadonlyArray<ProfileSummaryItem>,
  query: string,
): ProfileSummaryItem[] {
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

export function sortProfileSummary(
  items: ReadonlyArray<ProfileSummaryItem>,
  key: ProfileSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ProfileSummaryItem[] {
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

export function describeProfileSummaryItem(item: ProfileSummaryItem): string {
  const amount = formatSlug(item.amount);
  const name = storageText(collectionCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatProfileSummaryAmount(amount: number): string {
  return formatSlug(amount);
}

export function profileSummaryStatusTone(
  status: ProfileSummaryStatus,
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

export function pickProfileSummaryHighlights(
  items: ReadonlyArray<ProfileSummaryItem>,
  limit = 3,
): ProfileSummaryItem[] {
  return sortProfileSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
