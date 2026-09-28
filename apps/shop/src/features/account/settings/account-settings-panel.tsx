import { CommerceChipGroup } from '../../../components/commerce/chip/commerce-chip-group';
import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import { MediaHeader } from '../../../components/media/header/media-header';
import type { AccountSettingsItem } from './account-settings.model';
import { ACCOUNT_SETTINGS_FEATURE } from './account-settings.routes';
import { describeAccountSettingsItem } from './account-settings.utils';

export interface AccountSettingsPanelProps {
  selected: AccountSettingsItem | null;
  onClear: () => void;
}

export function AccountSettingsPanel({
  selected,
  onClear,
}: AccountSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAccountSettingsItem(selected)}
      </p>
      <CommerceChipGroup
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
        <MediaToolbar
          label="Media Toolbar"
          value={selected.product.rating}
          size="sm"
        />
        <MediaHeader
          label="Media Header"
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
        data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
