import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_INSIGHTS_FEATURE } from './store-locator-insights.routes';
import type { StoreLocatorInsightsSortKey } from './store-locator-insights.utils';

export interface StoreLocatorInsightsFiltersProps {
  query: string;
  sortKey: StoreLocatorInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-sort`}
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
