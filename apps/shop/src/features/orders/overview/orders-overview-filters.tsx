import type { ChangeEvent } from 'react';
import { ORDERS_OVERVIEW_FEATURE } from './orders-overview.routes';
import type { OrdersOverviewSortKey } from './orders-overview.utils';

export interface OrdersOverviewFiltersProps {
  query: string;
  sortKey: OrdersOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-sort`}
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
