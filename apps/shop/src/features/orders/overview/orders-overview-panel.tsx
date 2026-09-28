import { OverlayStatGroup } from '../../../components/overlay/stat/overlay-stat-group';
import { MarketingList } from '../../../components/marketing/list/marketing-list';
import type { OrdersOverviewItem } from './orders-overview.model';
import { ORDERS_OVERVIEW_FEATURE } from './orders-overview.routes';
import { describeOrdersOverviewItem } from './orders-overview.utils';

export interface OrdersOverviewPanelProps {
  selected: OrdersOverviewItem | null;
  onClear: () => void;
}

export function OrdersOverviewPanel({
  selected,
  onClear,
}: OrdersOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeOrdersOverviewItem(selected)}
      </p>
      <OverlayStatGroup
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
        <MarketingList
          label="Marketing List"
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
        data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
