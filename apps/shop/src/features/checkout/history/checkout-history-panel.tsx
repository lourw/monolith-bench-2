import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import type { CheckoutHistoryItem } from './checkout-history.model';
import { CHECKOUT_HISTORY_FEATURE } from './checkout-history.routes';
import { describeCheckoutHistoryItem } from './checkout-history.utils';

export interface CheckoutHistoryPanelProps {
  selected: CheckoutHistoryItem | null;
  onClear: () => void;
}

export function CheckoutHistoryPanel({
  selected,
  onClear,
}: CheckoutHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCheckoutHistoryItem(selected)}
      </p>
      <CommerceStatGroup
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
        data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
