import { InputsHeaderGroup } from '../../../components/inputs/header/inputs-header-group';
import { InputsPanel } from '../../../components/inputs/panel/inputs-panel';
import type { SubscriptionsSettingsItem } from './subscriptions-settings.model';
import { SUBSCRIPTIONS_SETTINGS_FEATURE } from './subscriptions-settings.routes';
import { describeSubscriptionsSettingsItem } from './subscriptions-settings.utils';

export interface SubscriptionsSettingsPanelProps {
  selected: SubscriptionsSettingsItem | null;
  onClear: () => void;
}

export function SubscriptionsSettingsPanel({
  selected,
  onClear,
}: SubscriptionsSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsSettingsItem(selected)}
      </p>
      <InputsHeaderGroup
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
        <InputsPanel
          label="Inputs Panel"
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
        data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
