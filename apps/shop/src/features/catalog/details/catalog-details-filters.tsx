import type { ChangeEvent } from 'react';
import { CATALOG_DETAILS_FEATURE } from './catalog-details.routes';
import type { CatalogDetailsSortKey } from './catalog-details.utils';

export interface CatalogDetailsFiltersProps {
  query: string;
  sortKey: CatalogDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_DETAILS_FEATURE.testId}-sort`}
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
