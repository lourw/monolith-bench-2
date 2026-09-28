import type { ChangeEvent } from 'react';
import { CHECKOUT_DASHBOARD_FEATURE } from './checkout-dashboard.routes';
import type { CheckoutDashboardSortKey } from './checkout-dashboard.utils';

export interface CheckoutDashboardFiltersProps {
  query: string;
  sortKey: CheckoutDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-sort`}
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
