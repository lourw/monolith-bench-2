import { CoreStatGroup } from '../../../components/core/stat/core-stat-group';
import type { NotificationsListItem } from './notifications-list.model';
import { NOTIFICATIONS_LIST_FEATURE } from './notifications-list.routes';
import { describeNotificationsListItem } from './notifications-list.utils';

export interface NotificationsListPanelProps {
  selected: NotificationsListItem | null;
  onClear: () => void;
}

export function NotificationsListPanel({
  selected,
  onClear,
}: NotificationsListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeNotificationsListItem(selected)}
      </p>
      <CoreStatGroup
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
        data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
