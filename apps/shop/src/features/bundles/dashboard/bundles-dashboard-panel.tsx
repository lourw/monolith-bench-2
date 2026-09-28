import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { FormsTile } from '../../../components/forms/tile/forms-tile';
import { OverlayTile } from '../../../components/overlay/tile/overlay-tile';
import type { BundlesDashboardItem } from './bundles-dashboard.model';
import { BUNDLES_DASHBOARD_FEATURE } from './bundles-dashboard.routes';
import { describeBundlesDashboardItem } from './bundles-dashboard.utils';

export interface BundlesDashboardPanelProps {
  selected: BundlesDashboardItem | null;
  onClear: () => void;
}

export function BundlesDashboardPanel({
  selected,
  onClear,
}: BundlesDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeBundlesDashboardItem(selected)}
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
        <FormsTile
          label="Forms Tile"
          value={selected.product.rating}
          size="sm"
        />
        <OverlayTile
          label="Overlay Tile"
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
        data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
