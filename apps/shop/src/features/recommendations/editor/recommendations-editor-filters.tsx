import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_EDITOR_FEATURE } from './recommendations-editor.routes';
import type { RecommendationsEditorSortKey } from './recommendations-editor.utils';

export interface RecommendationsEditorFiltersProps {
  query: string;
  sortKey: RecommendationsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-sort`}
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
