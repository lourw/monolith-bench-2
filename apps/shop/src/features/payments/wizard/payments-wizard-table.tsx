import { ChartsCard } from '../../../components/charts/card/charts-card';
import type { PaymentsWizardItem } from './payments-wizard.model';
import { PAYMENTS_WIZARD_FEATURE } from './payments-wizard.routes';
import {
  formatPaymentsWizardAmount,
  paymentsWizardStatusTone,
} from './payments-wizard.utils';

export interface PaymentsWizardTableProps {
  items: ReadonlyArray<PaymentsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsWizardTable({
  items,
  selectedId,
  onSelect,
}: PaymentsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-empty`}
      >
        No payments wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsCard
                label={item.status}
                tone={paymentsWizardStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
