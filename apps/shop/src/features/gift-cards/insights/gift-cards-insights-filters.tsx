import type { ChangeEvent } from 'react';
import { GIFT_CARDS_INSIGHTS_FEATURE } from './gift-cards-insights.routes';
import type { GiftCardsInsightsSortKey } from './gift-cards-insights.utils';

export interface GiftCardsInsightsFiltersProps {
  query: string;
  sortKey: GiftCardsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-sort`}
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
