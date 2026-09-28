import type { ChangeEvent } from 'react';
import { SUPPORT_SUMMARY_FEATURE } from './support-summary.routes';
import type { SupportSummarySortKey } from './support-summary.utils';

export interface SupportSummaryFiltersProps {
  query: string;
  sortKey: SupportSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-sort`}
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
