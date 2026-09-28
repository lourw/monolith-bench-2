import type { ChangeEvent } from 'react';
import { WISHLIST_SUMMARY_FEATURE } from './wishlist-summary.routes';
import type { WishlistSummarySortKey } from './wishlist-summary.utils';

export interface WishlistSummaryFiltersProps {
  query: string;
  sortKey: WishlistSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-sort`}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
