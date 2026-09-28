import type { ChangeEvent } from 'react';
import { PREORDERS_DASHBOARD_FEATURE } from './preorders-dashboard.routes';
import type { PreordersDashboardSortKey } from './preorders-dashboard.utils';

export interface PreordersDashboardFiltersProps {
  query: string;
  sortKey: PreordersDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-sort`}
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
