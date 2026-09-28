import type { ChangeEvent } from 'react';
import { PROMOTIONS_HISTORY_FEATURE } from './promotions-history.routes';
import type { PromotionsHistorySortKey } from './promotions-history.utils';

export interface PromotionsHistoryFiltersProps {
  query: string;
  sortKey: PromotionsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-sort`}
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
