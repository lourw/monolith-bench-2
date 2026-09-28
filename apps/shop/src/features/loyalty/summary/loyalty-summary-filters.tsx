import type { ChangeEvent } from 'react';
import { LOYALTY_SUMMARY_FEATURE } from './loyalty-summary.routes';
import type { LoyaltySummarySortKey } from './loyalty-summary.utils';

export interface LoyaltySummaryFiltersProps {
  query: string;
  sortKey: LoyaltySummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltySummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltySummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltySummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltySummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltySummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-sort`}
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
