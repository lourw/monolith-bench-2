import type { ChangeEvent } from 'react';
import { WISHLIST_INSIGHTS_FEATURE } from './wishlist-insights.routes';
import type { WishlistInsightsSortKey } from './wishlist-insights.utils';

export interface WishlistInsightsFiltersProps {
  query: string;
  sortKey: WishlistInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-sort`}
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
