import type { ChangeEvent } from 'react';
import { CATALOG_INSIGHTS_FEATURE } from './catalog-insights.routes';
import type { CatalogInsightsSortKey } from './catalog-insights.utils';

export interface CatalogInsightsFiltersProps {
  query: string;
  sortKey: CatalogInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CatalogInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CatalogInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CatalogInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CatalogInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CatalogInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter catalog insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-sort`}
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
