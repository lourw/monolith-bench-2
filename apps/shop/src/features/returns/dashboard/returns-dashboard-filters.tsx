import type { ChangeEvent } from 'react';
import { RETURNS_DASHBOARD_FEATURE } from './returns-dashboard.routes';
import type { ReturnsDashboardSortKey } from './returns-dashboard.utils';

export interface ReturnsDashboardFiltersProps {
  query: string;
  sortKey: ReturnsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-sort`}
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
