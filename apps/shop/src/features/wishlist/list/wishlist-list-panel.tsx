import { InputsListGroup } from '../../../components/inputs/list/inputs-list-group';
import type { WishlistListItem } from './wishlist-list.model';
import { WISHLIST_LIST_FEATURE } from './wishlist-list.routes';
import { describeWishlistListItem } from './wishlist-list.utils';

export interface WishlistListPanelProps {
  selected: WishlistListItem | null;
  onClear: () => void;
}

export function WishlistListPanel({
  selected,
  onClear,
}: WishlistListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistListItem(selected)}
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
        data-testid={`${WISHLIST_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
