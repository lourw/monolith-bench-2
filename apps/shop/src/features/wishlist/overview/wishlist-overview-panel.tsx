import { ChartsToolbarGroup } from '../../../components/charts/toolbar/charts-toolbar-group';
import { LayoutList } from '../../../components/layout/list/layout-list';
import type { WishlistOverviewItem } from './wishlist-overview.model';
import { WISHLIST_OVERVIEW_FEATURE } from './wishlist-overview.routes';
import { describeWishlistOverviewItem } from './wishlist-overview.utils';

export interface WishlistOverviewPanelProps {
  selected: WishlistOverviewItem | null;
  onClear: () => void;
}

export function WishlistOverviewPanel({
  selected,
  onClear,
}: WishlistOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistOverviewItem(selected)}
      </p>
      <ChartsToolbarGroup
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
        <LayoutList
          label="Layout List"
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
        data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
