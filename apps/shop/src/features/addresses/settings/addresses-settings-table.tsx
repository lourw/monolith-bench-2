import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { AddressesSettingsItem } from './addresses-settings.model';
import { ADDRESSES_SETTINGS_FEATURE } from './addresses-settings.routes';
import {
  formatAddressesSettingsAmount,
  addressesSettingsStatusTone,
} from './addresses-settings.utils';

export interface AddressesSettingsTableProps {
  items: ReadonlyArray<AddressesSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesSettingsTable({
  items,
  selectedId,
  onSelect,
}: AddressesSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-empty`}
      >
        No addresses settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutChip
                label={item.status}
                tone={addressesSettingsStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
