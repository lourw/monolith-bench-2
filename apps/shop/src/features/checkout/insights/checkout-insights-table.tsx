import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { CheckoutInsightsItem } from './checkout-insights.model';
import { CHECKOUT_INSIGHTS_FEATURE } from './checkout-insights.routes';
import {
  formatCheckoutInsightsAmount,
  checkoutInsightsStatusTone,
} from './checkout-insights.utils';

export interface CheckoutInsightsTableProps {
  items: ReadonlyArray<CheckoutInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutInsightsTable({
  items,
  selectedId,
  onSelect,
}: CheckoutInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-empty`}
      >
        No checkout insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsHeader
                label={item.status}
                tone={checkoutInsightsStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
