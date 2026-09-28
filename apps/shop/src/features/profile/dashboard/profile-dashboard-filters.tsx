import type { ChangeEvent } from 'react';
import { PROFILE_DASHBOARD_FEATURE } from './profile-dashboard.routes';
import type { ProfileDashboardSortKey } from './profile-dashboard.utils';

export interface ProfileDashboardFiltersProps {
  query: string;
  sortKey: ProfileDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-sort`}
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
