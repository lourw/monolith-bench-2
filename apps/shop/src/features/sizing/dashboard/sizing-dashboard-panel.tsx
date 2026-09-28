import { OverlayBadgeGroup } from '../../../components/overlay/badge/overlay-badge-group';
import { LayoutList } from '../../../components/layout/list/layout-list';
import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import type { SizingDashboardItem } from './sizing-dashboard.model';
import { SIZING_DASHBOARD_FEATURE } from './sizing-dashboard.routes';
import { describeSizingDashboardItem } from './sizing-dashboard.utils';

export interface SizingDashboardPanelProps {
  selected: SizingDashboardItem | null;
  onClear: () => void;
}

export function SizingDashboardPanel({
  selected,
  onClear,
}: SizingDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingDashboardItem(selected)}
      </p>
      <OverlayBadgeGroup
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
        <LayoutList
          label="Layout List"
          value={selected.product.rating}
          size="sm"
        />
        <MarketingChip
          label="Marketing Chip"
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
        data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
