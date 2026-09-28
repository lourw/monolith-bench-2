import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { DataList } from '../../../components/data/list/data-list';
import type { CheckoutDetailsItem } from './checkout-details.model';
import { CHECKOUT_DETAILS_FEATURE } from './checkout-details.routes';
import { describeCheckoutDetailsItem } from './checkout-details.utils';

export interface CheckoutDetailsPanelProps {
  selected: CheckoutDetailsItem | null;
  onClear: () => void;
}

export function CheckoutDetailsPanel({
  selected,
  onClear,
}: CheckoutDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCheckoutDetailsItem(selected)}
      </p>
      <MediaListGroup
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
        <DataList label="Data List" value={selected.product.rating} size="sm" />
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
        data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
