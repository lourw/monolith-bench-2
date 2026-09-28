import type { ChangeEvent } from 'react';
import { LOYALTY_DASHBOARD_FEATURE } from './loyalty-dashboard.routes';
import type { LoyaltyDashboardSortKey } from './loyalty-dashboard.utils';

export interface LoyaltyDashboardFiltersProps {
  query: string;
  sortKey: LoyaltyDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-sort`}
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
