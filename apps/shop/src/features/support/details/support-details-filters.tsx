import type { ChangeEvent } from 'react';
import { SUPPORT_DETAILS_FEATURE } from './support-details.routes';
import type { SupportDetailsSortKey } from './support-details.utils';

export interface SupportDetailsFiltersProps {
  query: string;
  sortKey: SupportDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-sort`}
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
