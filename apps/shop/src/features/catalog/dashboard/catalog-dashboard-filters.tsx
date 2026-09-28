import type { ChangeEvent } from 'react';
import { CATALOG_DASHBOARD_FEATURE } from './catalog-dashboard.routes';
import type { CatalogDashboardSortKey } from './catalog-dashboard.utils';

export interface CatalogDashboardFiltersProps {
  query: string;
  sortKey: CatalogDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-sort`}
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
