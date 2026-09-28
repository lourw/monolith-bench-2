import { CommercePanelGroup } from '../../../components/commerce/panel/commerce-panel-group';
import type { CartDashboardItem } from './cart-dashboard.model';
import { CART_DASHBOARD_FEATURE } from './cart-dashboard.routes';
import { describeCartDashboardItem } from './cart-dashboard.utils';

export interface CartDashboardPanelProps {
  selected: CartDashboardItem | null;
  onClear: () => void;
}

export function CartDashboardPanel({
  selected,
  onClear,
}: CartDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CART_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${CART_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CART_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCartDashboardItem(selected)}
      </p>
      <CommercePanelGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${CART_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
