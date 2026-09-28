import type { ChangeEvent } from 'react';
import { CATALOG_OVERVIEW_FEATURE } from './catalog-overview.routes';
import type { CatalogOverviewSortKey } from './catalog-overview.utils';

export interface CatalogOverviewFiltersProps {
  query: string;
  sortKey: CatalogOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-sort`}
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
