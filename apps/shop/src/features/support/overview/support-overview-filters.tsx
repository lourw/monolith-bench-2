import type { ChangeEvent } from 'react';
import { SUPPORT_OVERVIEW_FEATURE } from './support-overview.routes';
import type { SupportOverviewSortKey } from './support-overview.utils';

export interface SupportOverviewFiltersProps {
  query: string;
  sortKey: SupportOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-sort`}
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
