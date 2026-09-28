import type { ChangeEvent } from 'react';
import { INVENTORY_OVERVIEW_FEATURE } from './inventory-overview.routes';
import type { InventoryOverviewSortKey } from './inventory-overview.utils';

export interface InventoryOverviewFiltersProps {
  query: string;
  sortKey: InventoryOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-sort`}
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
