import type { ChangeEvent } from 'react';
import { CATALOG_SUMMARY_FEATURE } from './catalog-summary.routes';
import type { CatalogSummarySortKey } from './catalog-summary.utils';

export interface CatalogSummaryFiltersProps {
  query: string;
  sortKey: CatalogSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-sort`}
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
