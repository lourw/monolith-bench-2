import type { ChangeEvent } from 'react';
import { INVENTORY_LIST_FEATURE } from './inventory-list.routes';
import type { InventoryListSortKey } from './inventory-list.utils';

export interface InventoryListFiltersProps {
  query: string;
  sortKey: InventoryListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_LIST_FEATURE.testId}-sort`}
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
