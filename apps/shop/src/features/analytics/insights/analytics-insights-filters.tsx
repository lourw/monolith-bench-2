import type { ChangeEvent } from 'react';
import { ANALYTICS_INSIGHTS_FEATURE } from './analytics-insights.routes';
import type { AnalyticsInsightsSortKey } from './analytics-insights.utils';

export interface AnalyticsInsightsFiltersProps {
  query: string;
  sortKey: AnalyticsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-sort`}
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
