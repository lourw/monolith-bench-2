import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import type { AuthWizardItem } from './auth-wizard.model';
import { AUTH_WIZARD_FEATURE } from './auth-wizard.routes';
import {
  formatAuthWizardAmount,
  authWizardStatusTone,
} from './auth-wizard.utils';

export interface AuthWizardTableProps {
  items: ReadonlyArray<AuthWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthWizardTable({
  items,
  selectedId,
  onSelect,
}: AuthWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_WIZARD_FEATURE.testId}-empty`}
      >
        No auth wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceToolbar
                label={item.status}
                tone={authWizardStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
