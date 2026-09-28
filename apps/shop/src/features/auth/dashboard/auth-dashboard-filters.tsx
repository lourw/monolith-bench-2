import type { ChangeEvent } from 'react';
import { AUTH_DASHBOARD_FEATURE } from './auth-dashboard.routes';
import type { AuthDashboardSortKey } from './auth-dashboard.utils';

export interface AuthDashboardFiltersProps {
  query: string;
  sortKey: AuthDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-sort`}
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
