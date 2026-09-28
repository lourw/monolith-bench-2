import type { ChangeEvent } from 'react';
import { CATALOG_LIST_FEATURE } from './catalog-list.routes';
import type { CatalogListSortKey } from './catalog-list.utils';

export interface CatalogListFiltersProps {
  query: string;
  sortKey: CatalogListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_LIST_FEATURE.testId}-sort`}
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
