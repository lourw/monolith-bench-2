import type { ChangeEvent } from 'react';
import { ORDERS_HISTORY_FEATURE } from './orders-history.routes';
import type { OrdersHistorySortKey } from './orders-history.utils';

export interface OrdersHistoryFiltersProps {
  query: string;
  sortKey: OrdersHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_HISTORY_FEATURE.testId}-sort`}
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
