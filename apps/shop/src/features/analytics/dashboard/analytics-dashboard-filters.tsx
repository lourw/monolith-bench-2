import type { ChangeEvent } from 'react';
import { ANALYTICS_DASHBOARD_FEATURE } from './analytics-dashboard.routes';
import type { AnalyticsDashboardSortKey } from './analytics-dashboard.utils';

export interface AnalyticsDashboardFiltersProps {
  query: string;
  sortKey: AnalyticsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-sort`}
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
