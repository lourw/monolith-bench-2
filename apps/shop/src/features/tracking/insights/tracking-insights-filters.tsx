import type { ChangeEvent } from 'react';
import { TRACKING_INSIGHTS_FEATURE } from './tracking-insights.routes';
import type { TrackingInsightsSortKey } from './tracking-insights.utils';

export interface TrackingInsightsFiltersProps {
  query: string;
  sortKey: TrackingInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-sort`}
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
