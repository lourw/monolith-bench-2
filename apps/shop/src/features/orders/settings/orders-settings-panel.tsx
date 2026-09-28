import { InputsBannerGroup } from '../../../components/inputs/banner/inputs-banner-group';
import type { OrdersSettingsItem } from './orders-settings.model';
import { ORDERS_SETTINGS_FEATURE } from './orders-settings.routes';
import { describeOrdersSettingsItem } from './orders-settings.utils';

export interface OrdersSettingsPanelProps {
  selected: OrdersSettingsItem | null;
  onClear: () => void;
}

export function OrdersSettingsPanel({
  selected,
  onClear,
}: OrdersSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeOrdersSettingsItem(selected)}
      </p>
      <InputsBannerGroup
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
        data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
