import { MediaChip } from '../../../components/media/chip/media-chip';
import type { SupportSettingsItem } from './support-settings.model';
import { SUPPORT_SETTINGS_FEATURE } from './support-settings.routes';
import {
  formatSupportSettingsAmount,
  supportSettingsStatusTone,
} from './support-settings.utils';

export interface SupportSettingsTableProps {
  items: ReadonlyArray<SupportSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportSettingsTable({
  items,
  selectedId,
  onSelect,
}: SupportSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-empty`}
      >
        No support settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaChip
                label={item.status}
                tone={supportSettingsStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
