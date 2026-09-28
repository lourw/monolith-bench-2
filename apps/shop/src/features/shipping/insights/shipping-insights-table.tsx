import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import type { ShippingInsightsItem } from './shipping-insights.model';
import { SHIPPING_INSIGHTS_FEATURE } from './shipping-insights.routes';
import {
  formatShippingInsightsAmount,
  shippingInsightsStatusTone,
} from './shipping-insights.utils';

export interface ShippingInsightsTableProps {
  items: ReadonlyArray<ShippingInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingInsightsTable({
  items,
  selectedId,
  onSelect,
}: ShippingInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-empty`}
      >
        No shipping insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackCard
                label={item.status}
                tone={shippingInsightsStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
