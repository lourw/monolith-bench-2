import { FormsBadgeGroup } from '../../../components/forms/badge/forms-badge-group';
import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import { NavigationCard } from '../../../components/navigation/card/navigation-card';
import type { StoreLocatorListItem } from './store-locator-list.model';
import { STORE_LOCATOR_LIST_FEATURE } from './store-locator-list.routes';
import { describeStoreLocatorListItem } from './store-locator-list.utils';

export interface StoreLocatorListPanelProps {
  selected: StoreLocatorListItem | null;
  onClear: () => void;
}

export function StoreLocatorListPanel({
  selected,
  onClear,
}: StoreLocatorListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorListItem(selected)}
      </p>
      <FormsBadgeGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <MarketingChip
          label="Marketing Chip"
          value={selected.product.rating}
          size="sm"
        />
        <NavigationCard
          label="Navigation Card"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
