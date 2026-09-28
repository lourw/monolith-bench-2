import { NavigationCardGroup } from '../../../components/navigation/card/navigation-card-group';
import { LayoutCard } from '../../../components/layout/card/layout-card';
import { MarketingTile } from '../../../components/marketing/tile/marketing-tile';
import type { TrackingSummaryItem } from './tracking-summary.model';
import { TRACKING_SUMMARY_FEATURE } from './tracking-summary.routes';
import { describeTrackingSummaryItem } from './tracking-summary.utils';

export interface TrackingSummaryPanelProps {
  selected: TrackingSummaryItem | null;
  onClear: () => void;
}

export function TrackingSummaryPanel({
  selected,
  onClear,
}: TrackingSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeTrackingSummaryItem(selected)}
      </p>
      <NavigationCardGroup
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
        <LayoutCard
          label="Layout Card"
          value={selected.product.rating}
          size="sm"
        />
        <MarketingTile
          label="Marketing Tile"
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
        data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
