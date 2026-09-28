import type { ChangeEvent } from 'react';
import { AUTH_INSIGHTS_FEATURE } from './auth-insights.routes';
import type { AuthInsightsSortKey } from './auth-insights.utils';

export interface AuthInsightsFiltersProps {
  query: string;
  sortKey: AuthInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-sort`}
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
