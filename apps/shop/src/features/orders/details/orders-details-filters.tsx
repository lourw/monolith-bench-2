import type { ChangeEvent } from 'react';
import { ORDERS_DETAILS_FEATURE } from './orders-details.routes';
import type { OrdersDetailsSortKey } from './orders-details.utils';

export interface OrdersDetailsFiltersProps {
  query: string;
  sortKey: OrdersDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_DETAILS_FEATURE.testId}-sort`}
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
