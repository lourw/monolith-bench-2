import type { ChangeEvent } from 'react';
import { GIFT_CARDS_SETTINGS_FEATURE } from './gift-cards-settings.routes';
import type { GiftCardsSettingsSortKey } from './gift-cards-settings.utils';

export interface GiftCardsSettingsFiltersProps {
  query: string;
  sortKey: GiftCardsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-sort`}
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
