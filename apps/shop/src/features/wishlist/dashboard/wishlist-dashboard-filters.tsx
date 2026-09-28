import type { ChangeEvent } from 'react';
import { WISHLIST_DASHBOARD_FEATURE } from './wishlist-dashboard.routes';
import type { WishlistDashboardSortKey } from './wishlist-dashboard.utils';

export interface WishlistDashboardFiltersProps {
  query: string;
  sortKey: WishlistDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-sort`}
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
