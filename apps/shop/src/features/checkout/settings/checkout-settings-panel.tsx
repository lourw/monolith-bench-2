import { MediaChipGroup } from '../../../components/media/chip/media-chip-group';
import { NavigationPanel } from '../../../components/navigation/panel/navigation-panel';
import { FormsChip } from '../../../components/forms/chip/forms-chip';
import type { CheckoutSettingsItem } from './checkout-settings.model';
import { CHECKOUT_SETTINGS_FEATURE } from './checkout-settings.routes';
import { describeCheckoutSettingsItem } from './checkout-settings.utils';

export interface CheckoutSettingsPanelProps {
  selected: CheckoutSettingsItem | null;
  onClear: () => void;
}

export function CheckoutSettingsPanel({
  selected,
  onClear,
}: CheckoutSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCheckoutSettingsItem(selected)}
      </p>
      <MediaChipGroup
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
        <NavigationPanel
          label="Navigation Panel"
          value={selected.product.rating}
          size="sm"
        />
        <FormsChip
          label="Forms Chip"
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
        data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
