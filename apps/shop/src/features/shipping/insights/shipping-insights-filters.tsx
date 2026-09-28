import type { ChangeEvent } from 'react';
import { SHIPPING_INSIGHTS_FEATURE } from './shipping-insights.routes';
import type { ShippingInsightsSortKey } from './shipping-insights.utils';

export interface ShippingInsightsFiltersProps {
  query: string;
  sortKey: ShippingInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-sort`}
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
