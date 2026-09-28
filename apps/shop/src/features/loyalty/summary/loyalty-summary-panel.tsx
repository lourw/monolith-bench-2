import { MarketingToolbarGroup } from '../../../components/marketing/toolbar/marketing-toolbar-group';
import { MediaTile } from '../../../components/media/tile/media-tile';
import type { LoyaltySummaryItem } from './loyalty-summary.model';
import { LOYALTY_SUMMARY_FEATURE } from './loyalty-summary.routes';
import { describeLoyaltySummaryItem } from './loyalty-summary.utils';

export interface LoyaltySummaryPanelProps {
  selected: LoyaltySummaryItem | null;
  onClear: () => void;
}

export function LoyaltySummaryPanel({
  selected,
  onClear,
}: LoyaltySummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltySummaryItem(selected)}
      </p>
      <MarketingToolbarGroup
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
        <MediaTile
          label="Media Tile"
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
        data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
