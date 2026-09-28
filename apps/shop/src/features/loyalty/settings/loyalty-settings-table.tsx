import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import type { LoyaltySettingsItem } from './loyalty-settings.model';
import { LOYALTY_SETTINGS_FEATURE } from './loyalty-settings.routes';
import {
  formatLoyaltySettingsAmount,
  loyaltySettingsStatusTone,
} from './loyalty-settings.utils';

export interface LoyaltySettingsTableProps {
  items: ReadonlyArray<LoyaltySettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltySettingsTable({
  items,
  selectedId,
  onSelect,
}: LoyaltySettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-empty`}
      >
        No loyalty settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltySettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationToolbar
                label={item.status}
                tone={loyaltySettingsStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
