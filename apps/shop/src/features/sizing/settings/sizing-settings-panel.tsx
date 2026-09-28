import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { ChartsList } from '../../../components/charts/list/charts-list';
import { NavigationBanner } from '../../../components/navigation/banner/navigation-banner';
import type { SizingSettingsItem } from './sizing-settings.model';
import { SIZING_SETTINGS_FEATURE } from './sizing-settings.routes';
import { describeSizingSettingsItem } from './sizing-settings.utils';

export interface SizingSettingsPanelProps {
  selected: SizingSettingsItem | null;
  onClear: () => void;
}

export function SizingSettingsPanel({
  selected,
  onClear,
}: SizingSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${SIZING_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingSettingsItem(selected)}
      </p>
      <CommerceBadgeGroup
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
        <ChartsList
          label="Charts List"
          value={selected.product.rating}
          size="sm"
        />
        <NavigationBanner
          label="Navigation Banner"
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
        data-testid={`${SIZING_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
