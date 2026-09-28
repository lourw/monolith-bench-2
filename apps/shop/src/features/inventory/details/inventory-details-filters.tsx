import type { ChangeEvent } from 'react';
import { INVENTORY_DETAILS_FEATURE } from './inventory-details.routes';
import type { InventoryDetailsSortKey } from './inventory-details.utils';

export interface InventoryDetailsFiltersProps {
  query: string;
  sortKey: InventoryDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-sort`}
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
