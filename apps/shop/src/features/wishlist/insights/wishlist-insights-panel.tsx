import { ChartsBadgeGroup } from '../../../components/charts/badge/charts-badge-group';
import { TypographyStat } from '../../../components/typography/stat/typography-stat';
import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { WishlistInsightsItem } from './wishlist-insights.model';
import { WISHLIST_INSIGHTS_FEATURE } from './wishlist-insights.routes';
import { describeWishlistInsightsItem } from './wishlist-insights.utils';

export interface WishlistInsightsPanelProps {
  selected: WishlistInsightsItem | null;
  onClear: () => void;
}

export function WishlistInsightsPanel({
  selected,
  onClear,
}: WishlistInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistInsightsItem(selected)}
      </p>
      <ChartsBadgeGroup
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
        <TypographyStat
          label="Typography Stat"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackTile
          label="Feedback Tile"
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
        data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
