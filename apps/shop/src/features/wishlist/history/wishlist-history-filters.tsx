import type { ChangeEvent } from 'react';
import { WISHLIST_HISTORY_FEATURE } from './wishlist-history.routes';
import type { WishlistHistorySortKey } from './wishlist-history.utils';

export interface WishlistHistoryFiltersProps {
  query: string;
  sortKey: WishlistHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_HISTORY_FEATURE.testId}-sort`}
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
