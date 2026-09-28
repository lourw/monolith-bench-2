import { DataBannerGroup } from '../../../components/data/banner/data-banner-group';
import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import type { BundlesSettingsItem } from './bundles-settings.model';
import { BUNDLES_SETTINGS_FEATURE } from './bundles-settings.routes';
import { describeBundlesSettingsItem } from './bundles-settings.utils';

export interface BundlesSettingsPanelProps {
  selected: BundlesSettingsItem | null;
  onClear: () => void;
}

export function BundlesSettingsPanel({
  selected,
  onClear,
}: BundlesSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeBundlesSettingsItem(selected)}
      </p>
      <DataBannerGroup
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
        <ChartsChip
          label="Charts Chip"
          value={selected.product.rating}
          size="sm"
        />
        <ChartsBanner
          label="Charts Banner"
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
        data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
