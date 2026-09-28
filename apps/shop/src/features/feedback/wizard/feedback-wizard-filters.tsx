import type { ChangeEvent } from 'react';
import { FEEDBACK_WIZARD_FEATURE } from './feedback-wizard.routes';
import type { FeedbackWizardSortKey } from './feedback-wizard.utils';

export interface FeedbackWizardFiltersProps {
  query: string;
  sortKey: FeedbackWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-sort`}
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
