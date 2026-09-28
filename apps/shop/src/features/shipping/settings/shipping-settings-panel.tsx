import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import { FormsTile } from '../../../components/forms/tile/forms-tile';
import type { ShippingSettingsItem } from './shipping-settings.model';
import { SHIPPING_SETTINGS_FEATURE } from './shipping-settings.routes';
import { describeShippingSettingsItem } from './shipping-settings.utils';

export interface ShippingSettingsPanelProps {
  selected: ShippingSettingsItem | null;
  onClear: () => void;
}

export function ShippingSettingsPanel({
  selected,
  onClear,
}: ShippingSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeShippingSettingsItem(selected)}
      </p>
      <LayoutChipGroup
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
        <CommerceBadge
          label="Commerce Badge"
          value={selected.product.rating}
          size="sm"
        />
        <FormsTile
          label="Forms Tile"
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
        data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
