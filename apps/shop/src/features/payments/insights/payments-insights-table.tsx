import { LayoutHeader } from '../../../components/layout/header/layout-header';
import type { PaymentsInsightsItem } from './payments-insights.model';
import { PAYMENTS_INSIGHTS_FEATURE } from './payments-insights.routes';
import {
  formatPaymentsInsightsAmount,
  paymentsInsightsStatusTone,
} from './payments-insights.utils';

export interface PaymentsInsightsTableProps {
  items: ReadonlyArray<PaymentsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsInsightsTable({
  items,
  selectedId,
  onSelect,
}: PaymentsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No payments insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutHeader
                label={item.status}
                tone={paymentsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
