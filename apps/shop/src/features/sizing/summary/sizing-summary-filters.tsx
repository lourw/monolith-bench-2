import type { ChangeEvent } from 'react';
import { SIZING_SUMMARY_FEATURE } from './sizing-summary.routes';
import type { SizingSummarySortKey } from './sizing-summary.utils';

export interface SizingSummaryFiltersProps {
  query: string;
  sortKey: SizingSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_SUMMARY_FEATURE.testId}-sort`}
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
