import { ChartsTileGroup } from '../../../components/charts/tile/charts-tile-group';
import { MarketingStat } from '../../../components/marketing/stat/marketing-stat';
import type { CheckoutDashboardItem } from './checkout-dashboard.model';
import { CHECKOUT_DASHBOARD_FEATURE } from './checkout-dashboard.routes';
import { describeCheckoutDashboardItem } from './checkout-dashboard.utils';

export interface CheckoutDashboardPanelProps {
  selected: CheckoutDashboardItem | null;
  onClear: () => void;
}

export function CheckoutDashboardPanel({
  selected,
  onClear,
}: CheckoutDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCheckoutDashboardItem(selected)}
      </p>
      <ChartsTileGroup
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
        <MarketingStat
          label="Marketing Stat"
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
        data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
