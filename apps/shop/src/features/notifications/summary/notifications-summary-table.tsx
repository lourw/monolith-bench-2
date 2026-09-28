import { MediaList } from '../../../components/media/list/media-list';
import type { NotificationsSummaryItem } from './notifications-summary.model';
import { NOTIFICATIONS_SUMMARY_FEATURE } from './notifications-summary.routes';
import {
  formatNotificationsSummaryAmount,
  notificationsSummaryStatusTone,
} from './notifications-summary.utils';

export interface NotificationsSummaryTableProps {
  items: ReadonlyArray<NotificationsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsSummaryTable({
  items,
  selectedId,
  onSelect,
}: NotificationsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-empty`}
      >
        No notifications summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaList
                label={item.status}
                tone={notificationsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
