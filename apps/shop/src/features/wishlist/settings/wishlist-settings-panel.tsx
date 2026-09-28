import { LayoutStatGroup } from '../../../components/layout/stat/layout-stat-group';
import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import type { WishlistSettingsItem } from './wishlist-settings.model';
import { WISHLIST_SETTINGS_FEATURE } from './wishlist-settings.routes';
import { describeWishlistSettingsItem } from './wishlist-settings.utils';

export interface WishlistSettingsPanelProps {
  selected: WishlistSettingsItem | null;
  onClear: () => void;
}

export function WishlistSettingsPanel({
  selected,
  onClear,
}: WishlistSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistSettingsItem(selected)}
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
      <div className="feature-panel-extra">
        <InputsTile
          label="Inputs Tile"
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
        data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
