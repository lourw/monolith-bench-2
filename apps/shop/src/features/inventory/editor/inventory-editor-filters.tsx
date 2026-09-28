import type { ChangeEvent } from 'react';
import { INVENTORY_EDITOR_FEATURE } from './inventory-editor.routes';
import type { InventoryEditorSortKey } from './inventory-editor.utils';

export interface InventoryEditorFiltersProps {
  query: string;
  sortKey: InventoryEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-sort`}
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
