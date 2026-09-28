import type { ChangeEvent } from 'react';
import { PREORDERS_SUMMARY_FEATURE } from './preorders-summary.routes';
import type { PreordersSummarySortKey } from './preorders-summary.utils';

export interface PreordersSummaryFiltersProps {
  query: string;
  sortKey: PreordersSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-sort`}
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
