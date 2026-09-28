import type { ChangeEvent } from 'react';
import { ORDERS_LIST_FEATURE } from './orders-list.routes';
import type { OrdersListSortKey } from './orders-list.utils';

export interface OrdersListFiltersProps {
  query: string;
  sortKey: OrdersListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: OrdersListSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function OrdersListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_LIST_FEATURE.testId}-sort`}
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
