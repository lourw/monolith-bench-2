import { LayoutStatGroup } from '../../../components/layout/stat/layout-stat-group';
import type { StoreLocatorSettingsItem } from './store-locator-settings.model';
import { STORE_LOCATOR_SETTINGS_FEATURE } from './store-locator-settings.routes';
import { describeStoreLocatorSettingsItem } from './store-locator-settings.utils';

export interface StoreLocatorSettingsPanelProps {
  selected: StoreLocatorSettingsItem | null;
  onClear: () => void;
}

export function StoreLocatorSettingsPanel({
  selected,
  onClear,
}: StoreLocatorSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorSettingsItem(selected)}
      </p>
      <LayoutStatGroup
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
        data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
