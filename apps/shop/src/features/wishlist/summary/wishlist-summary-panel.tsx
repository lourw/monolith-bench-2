import { MediaTileGroup } from '../../../components/media/tile/media-tile-group';
import { MediaBadge } from '../../../components/media/badge/media-badge';
import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { WishlistSummaryItem } from './wishlist-summary.model';
import { WISHLIST_SUMMARY_FEATURE } from './wishlist-summary.routes';
import { describeWishlistSummaryItem } from './wishlist-summary.utils';

export interface WishlistSummaryPanelProps {
  selected: WishlistSummaryItem | null;
  onClear: () => void;
}

export function WishlistSummaryPanel({
  selected,
  onClear,
}: WishlistSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistSummaryItem(selected)}
      </p>
      <MediaTileGroup
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
        <MediaBadge
          label="Media Badge"
          value={selected.product.rating}
          size="sm"
        />
        <LayoutChip
          label="Layout Chip"
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
        data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
