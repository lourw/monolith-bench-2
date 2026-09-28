import { MediaCard } from '../../../components/media/card/media-card';
import type { AccountWizardItem } from './account-wizard.model';
import { ACCOUNT_WIZARD_FEATURE } from './account-wizard.routes';
import {
  formatAccountWizardAmount,
  accountWizardStatusTone,
} from './account-wizard.utils';

export interface AccountWizardTableProps {
  items: ReadonlyArray<AccountWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountWizardTable({
  items,
  selectedId,
  onSelect,
}: AccountWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-empty`}
      >
        No account wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaCard
                label={item.status}
                tone={accountWizardStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
