import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { ProfileWizardItem } from './profile-wizard.model';
import { PROFILE_WIZARD_FEATURE } from './profile-wizard.routes';
import {
  formatProfileWizardAmount,
  profileWizardStatusTone,
} from './profile-wizard.utils';

export interface ProfileWizardTableProps {
  items: ReadonlyArray<ProfileWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileWizardTable({
  items,
  selectedId,
  onSelect,
}: ProfileWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_WIZARD_FEATURE.testId}-empty`}
      >
        No profile wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBadge
                label={item.status}
                tone={profileWizardStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
