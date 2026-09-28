import type { ChangeEvent } from 'react';
import { SUPPORT_HISTORY_FEATURE } from './support-history.routes';
import type { SupportHistorySortKey } from './support-history.utils';

export interface SupportHistoryFiltersProps {
  query: string;
  sortKey: SupportHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-sort`}
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
