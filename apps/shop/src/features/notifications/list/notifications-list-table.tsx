import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import type { NotificationsListItem } from './notifications-list.model';
import { NOTIFICATIONS_LIST_FEATURE } from './notifications-list.routes';
import {
  formatNotificationsListAmount,
  notificationsListStatusTone,
} from './notifications-list.utils';

export interface NotificationsListTableProps {
  items: ReadonlyArray<NotificationsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsListTable({
  items,
  selectedId,
  onSelect,
}: NotificationsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-empty`}
      >
        No notifications list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingToolbar
                label={item.status}
                tone={notificationsListStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
