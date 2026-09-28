import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import type { SubscriptionsInsightsItem } from './subscriptions-insights.model';
import { SUBSCRIPTIONS_INSIGHTS_FEATURE } from './subscriptions-insights.routes';
import {
  formatSubscriptionsInsightsAmount,
  subscriptionsInsightsStatusTone,
} from './subscriptions-insights.utils';

export interface SubscriptionsInsightsTableProps {
  items: ReadonlyArray<SubscriptionsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsInsightsTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No subscriptions insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsBadge
                label={item.status}
                tone={subscriptionsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
