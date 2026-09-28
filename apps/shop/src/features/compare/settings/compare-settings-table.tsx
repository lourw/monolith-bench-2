import { DataTile } from '../../../components/data/tile/data-tile';
import type { CompareSettingsItem } from './compare-settings.model';
import { COMPARE_SETTINGS_FEATURE } from './compare-settings.routes';
import {
  formatCompareSettingsAmount,
  compareSettingsStatusTone,
} from './compare-settings.utils';

export interface CompareSettingsTableProps {
  items: ReadonlyArray<CompareSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareSettingsTable({
  items,
  selectedId,
  onSelect,
}: CompareSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-empty`}
      >
        No compare settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataTile
                label={item.status}
                tone={compareSettingsStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
