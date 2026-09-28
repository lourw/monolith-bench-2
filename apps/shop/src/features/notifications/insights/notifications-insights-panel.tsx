import { FeedbackCardGroup } from '../../../components/feedback/card/feedback-card-group';
import { LayoutHeader } from '../../../components/layout/header/layout-header';
import { CoreCard } from '../../../components/core/card/core-card';
import type { NotificationsInsightsItem } from './notifications-insights.model';
import { NOTIFICATIONS_INSIGHTS_FEATURE } from './notifications-insights.routes';
import { describeNotificationsInsightsItem } from './notifications-insights.utils';

export interface NotificationsInsightsPanelProps {
  selected: NotificationsInsightsItem | null;
  onClear: () => void;
}

export function NotificationsInsightsPanel({
  selected,
  onClear,
}: NotificationsInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeNotificationsInsightsItem(selected)}
      </p>
      <FeedbackCardGroup
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
        <LayoutHeader
          label="Layout Header"
          value={selected.product.rating}
          size="sm"
        />
        <CoreCard label="Core Card" value={selected.product.rating} size="sm" />
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
        data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
