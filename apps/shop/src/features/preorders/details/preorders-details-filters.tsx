import type { ChangeEvent } from 'react';
import { PREORDERS_DETAILS_FEATURE } from './preorders-details.routes';
import type { PreordersDetailsSortKey } from './preorders-details.utils';

export interface PreordersDetailsFiltersProps {
  query: string;
  sortKey: PreordersDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-sort`}
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
