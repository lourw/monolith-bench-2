import type { ChangeEvent } from 'react';
import { WISHLIST_OVERVIEW_FEATURE } from './wishlist-overview.routes';
import type { WishlistOverviewSortKey } from './wishlist-overview.utils';

export interface WishlistOverviewFiltersProps {
  query: string;
  sortKey: WishlistOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-sort`}
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
