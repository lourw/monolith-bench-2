import { DataCard } from '../../../components/data/card/data-card';
import type { AccountSettingsItem } from './account-settings.model';
import { ACCOUNT_SETTINGS_FEATURE } from './account-settings.routes';
import {
  formatAccountSettingsAmount,
  accountSettingsStatusTone,
} from './account-settings.utils';

export interface AccountSettingsTableProps {
  items: ReadonlyArray<AccountSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountSettingsTable({
  items,
  selectedId,
  onSelect,
}: AccountSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-empty`}
      >
        No account settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataCard
                label={item.status}
                tone={accountSettingsStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
