import type { ChangeEvent } from 'react';
import { BUNDLES_SUMMARY_FEATURE } from './bundles-summary.routes';
import type { BundlesSummarySortKey } from './bundles-summary.utils';

export interface BundlesSummaryFiltersProps {
  query: string;
  sortKey: BundlesSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-sort`}
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
