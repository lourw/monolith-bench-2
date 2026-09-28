import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { NotificationsInsightsItem } from './notifications-insights.model';
import { NOTIFICATIONS_INSIGHTS_FEATURE } from './notifications-insights.routes';
import {
  formatNotificationsInsightsAmount,
  notificationsInsightsStatusTone,
} from './notifications-insights.utils';

export interface NotificationsInsightsTableProps {
  items: ReadonlyArray<NotificationsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsInsightsTable({
  items,
  selectedId,
  onSelect,
}: NotificationsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No notifications insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBadge
                label={item.status}
                tone={notificationsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
