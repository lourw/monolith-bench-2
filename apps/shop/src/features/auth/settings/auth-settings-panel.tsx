import { OverlayChipGroup } from '../../../components/overlay/chip/overlay-chip-group';
import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import type { AuthSettingsItem } from './auth-settings.model';
import { AUTH_SETTINGS_FEATURE } from './auth-settings.routes';
import { describeAuthSettingsItem } from './auth-settings.utils';

export interface AuthSettingsPanelProps {
  selected: AuthSettingsItem | null;
  onClear: () => void;
}

export function AuthSettingsPanel({
  selected,
  onClear,
}: AuthSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${AUTH_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${AUTH_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${AUTH_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAuthSettingsItem(selected)}
      </p>
      <OverlayChipGroup
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
        <FeedbackHeader
          label="Feedback Header"
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
        data-testid={`${AUTH_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
