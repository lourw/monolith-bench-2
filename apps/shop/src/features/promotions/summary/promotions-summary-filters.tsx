import type { ChangeEvent } from 'react';
import { PROMOTIONS_SUMMARY_FEATURE } from './promotions-summary.routes';
import type { PromotionsSummarySortKey } from './promotions-summary.utils';

export interface PromotionsSummaryFiltersProps {
  query: string;
  sortKey: PromotionsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-sort`}
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
