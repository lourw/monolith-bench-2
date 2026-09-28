import type { ChangeEvent } from 'react';
import { CART_INSIGHTS_FEATURE } from './cart-insights.routes';
import type { CartInsightsSortKey } from './cart-insights.utils';

export interface CartInsightsFiltersProps {
  query: string;
  sortKey: CartInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CartInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_INSIGHTS_FEATURE.testId}-sort`}
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
