import type { ChangeEvent } from 'react';
import { CHECKOUT_INSIGHTS_FEATURE } from './checkout-insights.routes';
import type { CheckoutInsightsSortKey } from './checkout-insights.utils';

export interface CheckoutInsightsFiltersProps {
  query: string;
  sortKey: CheckoutInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-sort`}
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
