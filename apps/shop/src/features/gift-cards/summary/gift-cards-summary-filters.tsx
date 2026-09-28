import type { ChangeEvent } from 'react';
import { GIFT_CARDS_SUMMARY_FEATURE } from './gift-cards-summary.routes';
import type { GiftCardsSummarySortKey } from './gift-cards-summary.utils';

export interface GiftCardsSummaryFiltersProps {
  query: string;
  sortKey: GiftCardsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-sort`}
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
