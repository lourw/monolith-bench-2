import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_DASHBOARD_FEATURE } from './recommendations-dashboard.routes';
import type { RecommendationsDashboardSortKey } from './recommendations-dashboard.utils';

export interface RecommendationsDashboardFiltersProps {
  query: string;
  sortKey: RecommendationsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-sort`}
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
