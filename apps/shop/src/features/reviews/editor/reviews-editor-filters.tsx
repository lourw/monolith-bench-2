import type { ChangeEvent } from 'react';
import { REVIEWS_EDITOR_FEATURE } from './reviews-editor.routes';
import type { ReviewsEditorSortKey } from './reviews-editor.utils';

export interface ReviewsEditorFiltersProps {
  query: string;
  sortKey: ReviewsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReviewsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReviewsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReviewsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReviewsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReviewsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter reviews editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-sort`}
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
