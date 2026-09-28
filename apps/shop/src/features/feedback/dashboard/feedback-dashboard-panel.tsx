import { FormsTileGroup } from '../../../components/forms/tile/forms-tile-group';
import type { FeedbackDashboardItem } from './feedback-dashboard.model';
import { FEEDBACK_DASHBOARD_FEATURE } from './feedback-dashboard.routes';
import { describeFeedbackDashboardItem } from './feedback-dashboard.utils';

export interface FeedbackDashboardPanelProps {
  selected: FeedbackDashboardItem | null;
  onClear: () => void;
}

export function FeedbackDashboardPanel({
  selected,
  onClear,
}: FeedbackDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeFeedbackDashboardItem(selected)}
      </p>
      <FormsTileGroup
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
        data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
