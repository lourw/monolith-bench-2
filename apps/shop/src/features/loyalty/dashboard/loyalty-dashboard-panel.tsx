import { InputsListGroup } from '../../../components/inputs/list/inputs-list-group';
import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import { NavigationStat } from '../../../components/navigation/stat/navigation-stat';
import type { LoyaltyDashboardItem } from './loyalty-dashboard.model';
import { LOYALTY_DASHBOARD_FEATURE } from './loyalty-dashboard.routes';
import { describeLoyaltyDashboardItem } from './loyalty-dashboard.utils';

export interface LoyaltyDashboardPanelProps {
  selected: LoyaltyDashboardItem | null;
  onClear: () => void;
}

export function LoyaltyDashboardPanel({
  selected,
  onClear,
}: LoyaltyDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltyDashboardItem(selected)}
      </p>
      <InputsListGroup
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
        <ChartsBadge
          label="Charts Badge"
          value={selected.product.rating}
          size="sm"
        />
        <NavigationStat
          label="Navigation Stat"
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
        data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
