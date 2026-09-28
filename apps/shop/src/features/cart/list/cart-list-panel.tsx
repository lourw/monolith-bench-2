import { MediaBadgeGroup } from '../../../components/media/badge/media-badge-group';
import { MarketingStat } from '../../../components/marketing/stat/marketing-stat';
import { MarketingList } from '../../../components/marketing/list/marketing-list';
import type { CartListItem } from './cart-list.model';
import { CART_LIST_FEATURE } from './cart-list.routes';
import { describeCartListItem } from './cart-list.utils';

export interface CartListPanelProps {
  selected: CartListItem | null;
  onClear: () => void;
}

export function CartListPanel({ selected, onClear }: CartListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CART_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${CART_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CART_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCartListItem(selected)}
      </p>
      <MediaBadgeGroup
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
        data-testid={`${CART_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
