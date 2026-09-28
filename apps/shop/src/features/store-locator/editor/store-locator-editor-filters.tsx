import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_EDITOR_FEATURE } from './store-locator-editor.routes';
import type { StoreLocatorEditorSortKey } from './store-locator-editor.utils';

export interface StoreLocatorEditorFiltersProps {
  query: string;
  sortKey: StoreLocatorEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-sort`}
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
