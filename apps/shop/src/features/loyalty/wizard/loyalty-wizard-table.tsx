import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import type { LoyaltyWizardItem } from './loyalty-wizard.model';
import { LOYALTY_WIZARD_FEATURE } from './loyalty-wizard.routes';
import {
  formatLoyaltyWizardAmount,
  loyaltyWizardStatusTone,
} from './loyalty-wizard.utils';

export interface LoyaltyWizardTableProps {
  items: ReadonlyArray<LoyaltyWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyWizardTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-empty`}
      >
        No loyalty wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsTile
                label={item.status}
                tone={loyaltyWizardStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
