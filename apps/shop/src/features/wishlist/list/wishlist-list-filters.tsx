import type { ChangeEvent } from 'react';
import { WISHLIST_LIST_FEATURE } from './wishlist-list.routes';
import type { WishlistListSortKey } from './wishlist-list.utils';

export interface WishlistListFiltersProps {
  query: string;
  sortKey: WishlistListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_LIST_FEATURE.testId}-sort`}
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
