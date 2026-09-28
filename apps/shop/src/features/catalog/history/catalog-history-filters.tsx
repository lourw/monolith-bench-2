import type { ChangeEvent } from 'react';
import { CATALOG_HISTORY_FEATURE } from './catalog-history.routes';
import type { CatalogHistorySortKey } from './catalog-history.utils';

export interface CatalogHistoryFiltersProps {
  query: string;
  sortKey: CatalogHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_HISTORY_FEATURE.testId}-sort`}
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
