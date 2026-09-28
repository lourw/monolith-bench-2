import type { ChangeEvent } from 'react';
import { SEARCH_INSIGHTS_FEATURE } from './search-insights.routes';
import type { SearchInsightsSortKey } from './search-insights.utils';

export interface SearchInsightsFiltersProps {
  query: string;
  sortKey: SearchInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-sort`}
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
