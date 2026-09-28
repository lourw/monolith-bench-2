import type { ChangeEvent } from 'react';
import { REVIEWS_WIZARD_FEATURE } from './reviews-wizard.routes';
import type { ReviewsWizardSortKey } from './reviews-wizard.utils';

export interface ReviewsWizardFiltersProps {
  query: string;
  sortKey: ReviewsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-sort`}
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
