import { MediaChipGroup } from '../../../components/media/chip/media-chip-group';
import { DataBanner } from '../../../components/data/banner/data-banner';
import { DataStat } from '../../../components/data/stat/data-stat';
import type { CheckoutListItem } from './checkout-list.model';
import { CHECKOUT_LIST_FEATURE } from './checkout-list.routes';
import { describeCheckoutListItem } from './checkout-list.utils';

export interface CheckoutListPanelProps {
  selected: CheckoutListItem | null;
  onClear: () => void;
}

export function CheckoutListPanel({
  selected,
  onClear,
}: CheckoutListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CHECKOUT_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${CHECKOUT_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CHECKOUT_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCheckoutListItem(selected)}
      </p>
      <MediaChipGroup
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
        <DataBanner
          label="Data Banner"
          value={selected.product.rating}
          size="sm"
        />
        <DataStat label="Data Stat" value={selected.product.rating} size="sm" />
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
        data-testid={`${CHECKOUT_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
