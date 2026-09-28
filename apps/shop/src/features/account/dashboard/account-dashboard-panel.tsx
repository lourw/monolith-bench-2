import { OverlayTileGroup } from '../../../components/overlay/tile/overlay-tile-group';
import { TypographyCard } from '../../../components/typography/card/typography-card';
import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { AccountDashboardItem } from './account-dashboard.model';
import { ACCOUNT_DASHBOARD_FEATURE } from './account-dashboard.routes';
import { describeAccountDashboardItem } from './account-dashboard.utils';

export interface AccountDashboardPanelProps {
  selected: AccountDashboardItem | null;
  onClear: () => void;
}

export function AccountDashboardPanel({
  selected,
  onClear,
}: AccountDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAccountDashboardItem(selected)}
      </p>
      <OverlayTileGroup
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
        <TypographyCard
          label="Typography Card"
          value={selected.product.rating}
          size="sm"
        />
        <LayoutChip
          label="Layout Chip"
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
        data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
