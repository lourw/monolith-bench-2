import { OverlayBannerGroup } from '../../../components/overlay/banner/overlay-banner-group';
import { CoreStat } from '../../../components/core/stat/core-stat';
import type { BundlesHistoryItem } from './bundles-history.model';
import { BUNDLES_HISTORY_FEATURE } from './bundles-history.routes';
import { describeBundlesHistoryItem } from './bundles-history.utils';

export interface BundlesHistoryPanelProps {
  selected: BundlesHistoryItem | null;
  onClear: () => void;
}

export function BundlesHistoryPanel({
  selected,
  onClear,
}: BundlesHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeBundlesHistoryItem(selected)}
      </p>
      <OverlayBannerGroup
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
        <CoreStat label="Core Stat" value={selected.product.rating} size="sm" />
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
        data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
