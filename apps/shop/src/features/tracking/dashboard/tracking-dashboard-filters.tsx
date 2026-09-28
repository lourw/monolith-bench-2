import type { ChangeEvent } from 'react';
import { TRACKING_DASHBOARD_FEATURE } from './tracking-dashboard.routes';
import type { TrackingDashboardSortKey } from './tracking-dashboard.utils';

export interface TrackingDashboardFiltersProps {
  query: string;
  sortKey: TrackingDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-sort`}
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
