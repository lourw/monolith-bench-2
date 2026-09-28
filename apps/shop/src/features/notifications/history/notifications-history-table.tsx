import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import type { NotificationsHistoryItem } from './notifications-history.model';
import { NOTIFICATIONS_HISTORY_FEATURE } from './notifications-history.routes';
import {
  formatNotificationsHistoryAmount,
  notificationsHistoryStatusTone,
} from './notifications-history.utils';

export interface NotificationsHistoryTableProps {
  items: ReadonlyArray<NotificationsHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsHistoryTable({
  items,
  selectedId,
  onSelect,
}: NotificationsHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-empty`}
      >
        No notifications history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackStat
                label={item.status}
                tone={notificationsHistoryStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
