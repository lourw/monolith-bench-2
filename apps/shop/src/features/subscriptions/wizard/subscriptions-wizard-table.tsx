import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { SubscriptionsWizardItem } from './subscriptions-wizard.model';
import { SUBSCRIPTIONS_WIZARD_FEATURE } from './subscriptions-wizard.routes';
import {
  formatSubscriptionsWizardAmount,
  subscriptionsWizardStatusTone,
} from './subscriptions-wizard.utils';

export interface SubscriptionsWizardTableProps {
  items: ReadonlyArray<SubscriptionsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsWizardTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-empty`}
      >
        No subscriptions wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsHeader
                label={item.status}
                tone={subscriptionsWizardStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
