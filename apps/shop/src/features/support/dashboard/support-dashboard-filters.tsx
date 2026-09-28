import type { ChangeEvent } from 'react';
import { SUPPORT_DASHBOARD_FEATURE } from './support-dashboard.routes';
import type { SupportDashboardSortKey } from './support-dashboard.utils';

export interface SupportDashboardFiltersProps {
  query: string;
  sortKey: SupportDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-sort`}
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
