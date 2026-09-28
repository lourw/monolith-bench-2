import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_INSIGHTS_FEATURE } from './recommendations-insights.routes';
import type { RecommendationsInsightsSortKey } from './recommendations-insights.utils';

export interface RecommendationsInsightsFiltersProps {
  query: string;
  sortKey: RecommendationsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-sort`}
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
