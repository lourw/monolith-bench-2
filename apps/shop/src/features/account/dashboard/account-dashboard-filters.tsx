import type { ChangeEvent } from 'react';
import { ACCOUNT_DASHBOARD_FEATURE } from './account-dashboard.routes';
import type { AccountDashboardSortKey } from './account-dashboard.utils';

export interface AccountDashboardFiltersProps {
  query: string;
  sortKey: AccountDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-sort`}
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
