import type { ChangeEvent } from 'react';
import { BUNDLES_INSIGHTS_FEATURE } from './bundles-insights.routes';
import type { BundlesInsightsSortKey } from './bundles-insights.utils';

export interface BundlesInsightsFiltersProps {
  query: string;
  sortKey: BundlesInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-sort`}
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
