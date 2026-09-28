import type { ChangeEvent } from 'react';
import { INVENTORY_DASHBOARD_FEATURE } from './inventory-dashboard.routes';
import type { InventoryDashboardSortKey } from './inventory-dashboard.utils';

export interface InventoryDashboardFiltersProps {
  query: string;
  sortKey: InventoryDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_DASHBOARD_FEATURE.testId}-sort`}
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
