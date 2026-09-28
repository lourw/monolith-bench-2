import type { ChangeEvent } from 'react';
import { RETURNS_INSIGHTS_FEATURE } from './returns-insights.routes';
import type { ReturnsInsightsSortKey } from './returns-insights.utils';

export interface ReturnsInsightsFiltersProps {
  query: string;
  sortKey: ReturnsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-sort`}
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
