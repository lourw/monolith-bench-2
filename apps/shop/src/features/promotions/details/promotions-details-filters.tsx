import type { ChangeEvent } from 'react';
import { PROMOTIONS_DETAILS_FEATURE } from './promotions-details.routes';
import type { PromotionsDetailsSortKey } from './promotions-details.utils';

export interface PromotionsDetailsFiltersProps {
  query: string;
  sortKey: PromotionsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-sort`}
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
