import { FeedbackPanelGroup } from '../../../components/feedback/panel/feedback-panel-group';
import { CommerceTile } from '../../../components/commerce/tile/commerce-tile';
import type { OrdersDetailsItem } from './orders-details.model';
import { ORDERS_DETAILS_FEATURE } from './orders-details.routes';
import { describeOrdersDetailsItem } from './orders-details.utils';

export interface OrdersDetailsPanelProps {
  selected: OrdersDetailsItem | null;
  onClear: () => void;
}

export function OrdersDetailsPanel({
  selected,
  onClear,
}: OrdersDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ORDERS_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${ORDERS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ORDERS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeOrdersDetailsItem(selected)}
      </p>
      <FeedbackPanelGroup
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
        <CommerceTile
          label="Commerce Tile"
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
        data-testid={`${ORDERS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
