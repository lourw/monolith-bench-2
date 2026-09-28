import { NavigationPanelGroup } from '../../../components/navigation/panel/navigation-panel-group';
import { MarketingStat } from '../../../components/marketing/stat/marketing-stat';
import type { OrdersHistoryItem } from './orders-history.model';
import { ORDERS_HISTORY_FEATURE } from './orders-history.routes';
import { describeOrdersHistoryItem } from './orders-history.utils';

export interface OrdersHistoryPanelProps {
  selected: OrdersHistoryItem | null;
  onClear: () => void;
}

export function OrdersHistoryPanel({
  selected,
  onClear,
}: OrdersHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ORDERS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${ORDERS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ORDERS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeOrdersHistoryItem(selected)}
      </p>
      <NavigationPanelGroup
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
        data-testid={`${ORDERS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
