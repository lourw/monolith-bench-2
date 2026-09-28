import type { ChangeEvent } from 'react';
import { ORDERS_SUMMARY_FEATURE } from './orders-summary.routes';
import type { OrdersSummarySortKey } from './orders-summary.utils';

export interface OrdersSummaryFiltersProps {
  query: string;
  sortKey: OrdersSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-sort`}
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
