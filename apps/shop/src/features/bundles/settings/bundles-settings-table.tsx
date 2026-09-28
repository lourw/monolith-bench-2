import { MediaChip } from '../../../components/media/chip/media-chip';
import type { BundlesSettingsItem } from './bundles-settings.model';
import { BUNDLES_SETTINGS_FEATURE } from './bundles-settings.routes';
import {
  formatBundlesSettingsAmount,
  bundlesSettingsStatusTone,
} from './bundles-settings.utils';

export interface BundlesSettingsTableProps {
  items: ReadonlyArray<BundlesSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesSettingsTable({
  items,
  selectedId,
  onSelect,
}: BundlesSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-empty`}
      >
        No bundles settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaChip
                label={item.status}
                tone={bundlesSettingsStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
