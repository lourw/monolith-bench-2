import type { ChangeEvent } from 'react';
import { WISHLIST_WIZARD_FEATURE } from './wishlist-wizard.routes';
import type { WishlistWizardSortKey } from './wishlist-wizard.utils';

export interface WishlistWizardFiltersProps {
  query: string;
  sortKey: WishlistWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-sort`}
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
