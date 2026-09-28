import type { ChangeEvent } from 'react';
import { ORDERS_DASHBOARD_FEATURE } from './orders-dashboard.routes';
import type { OrdersDashboardSortKey } from './orders-dashboard.utils';

export interface OrdersDashboardFiltersProps {
  query: string;
  sortKey: OrdersDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-sort`}
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
