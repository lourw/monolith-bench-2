import type { ChangeEvent } from 'react';
import { PROMOTIONS_OVERVIEW_FEATURE } from './promotions-overview.routes';
import type { PromotionsOverviewSortKey } from './promotions-overview.utils';

export interface PromotionsOverviewFiltersProps {
  query: string;
  sortKey: PromotionsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-sort`}
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
