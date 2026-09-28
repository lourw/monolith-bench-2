import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import type { PaymentsSummaryItem } from './payments-summary.model';
import { PAYMENTS_SUMMARY_FEATURE } from './payments-summary.routes';
import {
  formatPaymentsSummaryAmount,
  paymentsSummaryStatusTone,
} from './payments-summary.utils';

export interface PaymentsSummaryTableProps {
  items: ReadonlyArray<PaymentsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsSummaryTable({
  items,
  selectedId,
  onSelect,
}: PaymentsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-empty`}
      >
        No payments summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationBadge
                label={item.status}
                tone={paymentsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
