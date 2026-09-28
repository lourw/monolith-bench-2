import type { ChangeEvent } from 'react';
import { PROMOTIONS_EDITOR_FEATURE } from './promotions-editor.routes';
import type { PromotionsEditorSortKey } from './promotions-editor.utils';

export interface PromotionsEditorFiltersProps {
  query: string;
  sortKey: PromotionsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-sort`}
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
