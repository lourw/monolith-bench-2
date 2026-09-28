import { CoreStat } from '../../../components/core/stat/core-stat';
import type { NotificationsDetailsItem } from './notifications-details.model';
import { NOTIFICATIONS_DETAILS_FEATURE } from './notifications-details.routes';
import {
  formatNotificationsDetailsAmount,
  notificationsDetailsStatusTone,
} from './notifications-details.utils';

export interface NotificationsDetailsTableProps {
  items: ReadonlyArray<NotificationsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsDetailsTable({
  items,
  selectedId,
  onSelect,
}: NotificationsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-empty`}
      >
        No notifications details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreStat
                label={item.status}
                tone={notificationsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
