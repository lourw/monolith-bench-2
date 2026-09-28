import { MediaTileGroup } from '../../../components/media/tile/media-tile-group';
import type { LoyaltySettingsItem } from './loyalty-settings.model';
import { LOYALTY_SETTINGS_FEATURE } from './loyalty-settings.routes';
import { describeLoyaltySettingsItem } from './loyalty-settings.utils';

export interface LoyaltySettingsPanelProps {
  selected: LoyaltySettingsItem | null;
  onClear: () => void;
}

export function LoyaltySettingsPanel({
  selected,
  onClear,
}: LoyaltySettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltySettingsItem(selected)}
      </p>
      <MediaTileGroup
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
        data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
