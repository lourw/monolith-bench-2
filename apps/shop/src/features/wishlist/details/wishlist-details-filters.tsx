import type { ChangeEvent } from 'react';
import { WISHLIST_DETAILS_FEATURE } from './wishlist-details.routes';
import type { WishlistDetailsSortKey } from './wishlist-details.utils';

export interface WishlistDetailsFiltersProps {
  query: string;
  sortKey: WishlistDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-sort`}
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
