import { DataTileGroup } from '../../../components/data/tile/data-tile-group';
import type { PromotionsSettingsItem } from './promotions-settings.model';
import { PROMOTIONS_SETTINGS_FEATURE } from './promotions-settings.routes';
import { describePromotionsSettingsItem } from './promotions-settings.utils';

export interface PromotionsSettingsPanelProps {
  selected: PromotionsSettingsItem | null;
  onClear: () => void;
}

export function PromotionsSettingsPanel({
  selected,
  onClear,
}: PromotionsSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePromotionsSettingsItem(selected)}
      </p>
      <DataTileGroup
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
        data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
