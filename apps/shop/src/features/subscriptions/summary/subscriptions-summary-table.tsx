import { DataToolbar } from '../../../components/data/toolbar/data-toolbar';
import type { SubscriptionsSummaryItem } from './subscriptions-summary.model';
import { SUBSCRIPTIONS_SUMMARY_FEATURE } from './subscriptions-summary.routes';
import {
  formatSubscriptionsSummaryAmount,
  subscriptionsSummaryStatusTone,
} from './subscriptions-summary.utils';

export interface SubscriptionsSummaryTableProps {
  items: ReadonlyArray<SubscriptionsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsSummaryTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-empty`}
      >
        No subscriptions summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataToolbar
                label={item.status}
                tone={subscriptionsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
