import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { CommerceBanner } from '../../../components/commerce/banner/commerce-banner';
import { InputsList } from '../../../components/inputs/list/inputs-list';
import type { WishlistDetailsItem } from './wishlist-details.model';
import { WISHLIST_DETAILS_FEATURE } from './wishlist-details.routes';
import { describeWishlistDetailsItem } from './wishlist-details.utils';

export interface WishlistDetailsPanelProps {
  selected: WishlistDetailsItem | null;
  onClear: () => void;
}

export function WishlistDetailsPanel({
  selected,
  onClear,
}: WishlistDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistDetailsItem(selected)}
      </p>
      <DataStatGroup
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
        <CommerceBanner
          label="Commerce Banner"
          value={selected.product.rating}
          size="sm"
        />
        <InputsList
          label="Inputs List"
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
        data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
