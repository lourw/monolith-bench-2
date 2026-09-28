import type { ChangeEvent } from 'react';
import { ACCOUNT_EDITOR_FEATURE } from './account-editor.routes';
import type { AccountEditorSortKey } from './account-editor.utils';

export interface AccountEditorFiltersProps {
  query: string;
  sortKey: AccountEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-sort`}
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
