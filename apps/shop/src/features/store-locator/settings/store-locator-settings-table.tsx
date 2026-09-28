import { LayoutList } from '../../../components/layout/list/layout-list';
import type { StoreLocatorSettingsItem } from './store-locator-settings.model';
import { STORE_LOCATOR_SETTINGS_FEATURE } from './store-locator-settings.routes';
import {
  formatStoreLocatorSettingsAmount,
  storeLocatorSettingsStatusTone,
} from './store-locator-settings.utils';

export interface StoreLocatorSettingsTableProps {
  items: ReadonlyArray<StoreLocatorSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorSettingsTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-empty`}
      >
        No store locator settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutList
                label={item.status}
                tone={storeLocatorSettingsStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
