import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import type { NotificationsEditorItem } from './notifications-editor.model';
import { NOTIFICATIONS_EDITOR_FEATURE } from './notifications-editor.routes';
import {
  formatNotificationsEditorAmount,
  notificationsEditorStatusTone,
} from './notifications-editor.utils';

export interface NotificationsEditorTableProps {
  items: ReadonlyArray<NotificationsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsEditorTable({
  items,
  selectedId,
  onSelect,
}: NotificationsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-empty`}
      >
        No notifications editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackChip
                label={item.status}
                tone={notificationsEditorStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
