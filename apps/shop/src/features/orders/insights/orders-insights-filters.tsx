import type { ChangeEvent } from 'react';
import { ORDERS_INSIGHTS_FEATURE } from './orders-insights.routes';
import type { OrdersInsightsSortKey } from './orders-insights.utils';

export interface OrdersInsightsFiltersProps {
  query: string;
  sortKey: OrdersInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-sort`}
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
