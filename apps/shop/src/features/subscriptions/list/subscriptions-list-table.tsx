import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { SubscriptionsListItem } from './subscriptions-list.model';
import { SUBSCRIPTIONS_LIST_FEATURE } from './subscriptions-list.routes';
import {
  formatSubscriptionsListAmount,
  subscriptionsListStatusTone,
} from './subscriptions-list.utils';

export interface SubscriptionsListTableProps {
  items: ReadonlyArray<SubscriptionsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsListTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-empty`}
      >
        No subscriptions list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsHeader
                label={item.status}
                tone={subscriptionsListStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
