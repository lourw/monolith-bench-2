import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import type { SubscriptionsEditorItem } from './subscriptions-editor.model';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from './subscriptions-editor.routes';
import {
  formatSubscriptionsEditorAmount,
  subscriptionsEditorStatusTone,
} from './subscriptions-editor.utils';

export interface SubscriptionsEditorTableProps {
  items: ReadonlyArray<SubscriptionsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsEditorTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-empty`}
      >
        No subscriptions editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackStat
                label={item.status}
                tone={subscriptionsEditorStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
