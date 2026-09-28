import type { ChangeEvent } from 'react';
import { ADDRESSES_DASHBOARD_FEATURE } from './addresses-dashboard.routes';
import type { AddressesDashboardSortKey } from './addresses-dashboard.utils';

export interface AddressesDashboardFiltersProps {
  query: string;
  sortKey: AddressesDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-sort`}
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
