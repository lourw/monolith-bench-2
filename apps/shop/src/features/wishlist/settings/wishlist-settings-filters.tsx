import type { ChangeEvent } from 'react';
import { WISHLIST_SETTINGS_FEATURE } from './wishlist-settings.routes';
import type { WishlistSettingsSortKey } from './wishlist-settings.utils';

export interface WishlistSettingsFiltersProps {
  query: string;
  sortKey: WishlistSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-sort`}
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
