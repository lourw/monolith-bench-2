import { NavigationBadgeGroup } from '../../../components/navigation/badge/navigation-badge-group';
import { OverlayList } from '../../../components/overlay/list/overlay-list';
import { NavigationBanner } from '../../../components/navigation/banner/navigation-banner';
import type { TrackingOverviewItem } from './tracking-overview.model';
import { TRACKING_OVERVIEW_FEATURE } from './tracking-overview.routes';
import { describeTrackingOverviewItem } from './tracking-overview.utils';

export interface TrackingOverviewPanelProps {
  selected: TrackingOverviewItem | null;
  onClear: () => void;
}

export function TrackingOverviewPanel({
  selected,
  onClear,
}: TrackingOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeTrackingOverviewItem(selected)}
      </p>
      <NavigationBadgeGroup
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
        <OverlayList
          label="Overlay List"
          value={selected.product.rating}
          size="sm"
        />
        <NavigationBanner
          label="Navigation Banner"
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
        data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
