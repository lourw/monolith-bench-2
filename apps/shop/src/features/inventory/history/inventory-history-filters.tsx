import type { ChangeEvent } from 'react';
import { INVENTORY_HISTORY_FEATURE } from './inventory-history.routes';
import type { InventoryHistorySortKey } from './inventory-history.utils';

export interface InventoryHistoryFiltersProps {
  query: string;
  sortKey: InventoryHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-sort`}
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
