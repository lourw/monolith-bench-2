import { NavigationListGroup } from '../../../components/navigation/list/navigation-list-group';
import { CommerceList } from '../../../components/commerce/list/commerce-list';
import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { NotificationsSummaryItem } from './notifications-summary.model';
import { NOTIFICATIONS_SUMMARY_FEATURE } from './notifications-summary.routes';
import { describeNotificationsSummaryItem } from './notifications-summary.utils';

export interface NotificationsSummaryPanelProps {
  selected: NotificationsSummaryItem | null;
  onClear: () => void;
}

export function NotificationsSummaryPanel({
  selected,
  onClear,
}: NotificationsSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeNotificationsSummaryItem(selected)}
      </p>
      <NavigationListGroup
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
        <CommerceList
          label="Commerce List"
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
        data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
