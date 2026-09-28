import type { ChangeEvent } from 'react';
import { ADDRESSES_SUMMARY_FEATURE } from './addresses-summary.routes';
import type { AddressesSummarySortKey } from './addresses-summary.utils';

export interface AddressesSummaryFiltersProps {
  query: string;
  sortKey: AddressesSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-sort`}
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
