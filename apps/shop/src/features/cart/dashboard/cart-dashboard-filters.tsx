import type { ChangeEvent } from 'react';
import { CART_DASHBOARD_FEATURE } from './cart-dashboard.routes';
import type { CartDashboardSortKey } from './cart-dashboard.utils';

export interface CartDashboardFiltersProps {
  query: string;
  sortKey: CartDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CartDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_DASHBOARD_FEATURE.testId}-sort`}
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
