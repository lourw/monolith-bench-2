import type { ChangeEvent } from 'react';
import { COMPARE_HISTORY_FEATURE } from './compare-history.routes';
import type { CompareHistorySortKey } from './compare-history.utils';

export interface CompareHistoryFiltersProps {
  query: string;
  sortKey: CompareHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_HISTORY_FEATURE.testId}-sort`}
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
