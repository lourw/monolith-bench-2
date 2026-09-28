import { NavigationPanel } from '../../../components/navigation/panel/navigation-panel';
import type { NotificationsDashboardItem } from './notifications-dashboard.model';
import { NOTIFICATIONS_DASHBOARD_FEATURE } from './notifications-dashboard.routes';
import {
  formatNotificationsDashboardAmount,
  notificationsDashboardStatusTone,
} from './notifications-dashboard.utils';

export interface NotificationsDashboardTableProps {
  items: ReadonlyArray<NotificationsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsDashboardTable({
  items,
  selectedId,
  onSelect,
}: NotificationsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No notifications dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationPanel
                label={item.status}
                tone={notificationsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
