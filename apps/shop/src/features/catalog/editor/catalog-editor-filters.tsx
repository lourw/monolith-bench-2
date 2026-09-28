import type { ChangeEvent } from 'react';
import { CATALOG_EDITOR_FEATURE } from './catalog-editor.routes';
import type { CatalogEditorSortKey } from './catalog-editor.utils';

export interface CatalogEditorFiltersProps {
  query: string;
  sortKey: CatalogEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_EDITOR_FEATURE.testId}-sort`}
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
