import { NavigationHeader } from '../../../components/navigation/header/navigation-header';
import type { ProfileSettingsItem } from './profile-settings.model';
import { PROFILE_SETTINGS_FEATURE } from './profile-settings.routes';
import {
  formatProfileSettingsAmount,
  profileSettingsStatusTone,
} from './profile-settings.utils';

export interface ProfileSettingsTableProps {
  items: ReadonlyArray<ProfileSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileSettingsTable({
  items,
  selectedId,
  onSelect,
}: ProfileSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-empty`}
      >
        No profile settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationHeader
                label={item.status}
                tone={profileSettingsStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
