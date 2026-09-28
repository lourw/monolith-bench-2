import { CommerceChip } from '../../../components/commerce/chip/commerce-chip';
import type { PreordersSettingsItem } from './preorders-settings.model';
import { PREORDERS_SETTINGS_FEATURE } from './preorders-settings.routes';
import {
  formatPreordersSettingsAmount,
  preordersSettingsStatusTone,
} from './preorders-settings.utils';

export interface PreordersSettingsTableProps {
  items: ReadonlyArray<PreordersSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersSettingsTable({
  items,
  selectedId,
  onSelect,
}: PreordersSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-empty`}
      >
        No preorders settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceChip
                label={item.status}
                tone={preordersSettingsStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
