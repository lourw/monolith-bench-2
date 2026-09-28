import type { ChangeEvent } from 'react';
import { PROMOTIONS_LIST_FEATURE } from './promotions-list.routes';
import type { PromotionsListSortKey } from './promotions-list.utils';

export interface PromotionsListFiltersProps {
  query: string;
  sortKey: PromotionsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-sort`}
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
