import { DataCardGroup } from '../../../components/data/card/data-card-group';
import type { StoreLocatorOverviewItem } from './store-locator-overview.model';
import { STORE_LOCATOR_OVERVIEW_FEATURE } from './store-locator-overview.routes';
import { describeStoreLocatorOverviewItem } from './store-locator-overview.utils';

export interface StoreLocatorOverviewPanelProps {
  selected: StoreLocatorOverviewItem | null;
  onClear: () => void;
}

export function StoreLocatorOverviewPanel({
  selected,
  onClear,
}: StoreLocatorOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorOverviewItem(selected)}
      </p>
      <DataCardGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
