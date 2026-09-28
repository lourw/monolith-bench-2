import { InputsChip } from '../../../components/inputs/chip/inputs-chip';
import type { AuthSettingsItem } from './auth-settings.model';
import { AUTH_SETTINGS_FEATURE } from './auth-settings.routes';
import {
  formatAuthSettingsAmount,
  authSettingsStatusTone,
} from './auth-settings.utils';

export interface AuthSettingsTableProps {
  items: ReadonlyArray<AuthSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthSettingsTable({
  items,
  selectedId,
  onSelect,
}: AuthSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_SETTINGS_FEATURE.testId}-empty`}
      >
        No auth settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsChip
                label={item.status}
                tone={authSettingsStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
