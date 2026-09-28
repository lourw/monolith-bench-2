import type { ChangeEvent } from 'react';
import { COMPARE_INSIGHTS_FEATURE } from './compare-insights.routes';
import type { CompareInsightsSortKey } from './compare-insights.utils';

export interface CompareInsightsFiltersProps {
  query: string;
  sortKey: CompareInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-sort`}
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
