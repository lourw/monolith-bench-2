import { FeedbackBannerGroup } from '../../../components/feedback/banner/feedback-banner-group';
import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { TrackingDashboardItem } from './tracking-dashboard.model';
import { TRACKING_DASHBOARD_FEATURE } from './tracking-dashboard.routes';
import { describeTrackingDashboardItem } from './tracking-dashboard.utils';

export interface TrackingDashboardPanelProps {
  selected: TrackingDashboardItem | null;
  onClear: () => void;
}

export function TrackingDashboardPanel({
  selected,
  onClear,
}: TrackingDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeTrackingDashboardItem(selected)}
      </p>
      <FeedbackBannerGroup
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
        <FormsBadge
          label="Forms Badge"
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
        data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
