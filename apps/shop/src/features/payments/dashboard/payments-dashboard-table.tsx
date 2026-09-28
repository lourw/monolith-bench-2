import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import type { PaymentsDashboardItem } from './payments-dashboard.model';
import { PAYMENTS_DASHBOARD_FEATURE } from './payments-dashboard.routes';
import {
  formatPaymentsDashboardAmount,
  paymentsDashboardStatusTone,
} from './payments-dashboard.utils';

export interface PaymentsDashboardTableProps {
  items: ReadonlyArray<PaymentsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsDashboardTable({
  items,
  selectedId,
  onSelect,
}: PaymentsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No payments dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingCard
                label={item.status}
                tone={paymentsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
