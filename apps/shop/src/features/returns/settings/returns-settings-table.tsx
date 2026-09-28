import { MarketingList } from '../../../components/marketing/list/marketing-list';
import type { ReturnsSettingsItem } from './returns-settings.model';
import { RETURNS_SETTINGS_FEATURE } from './returns-settings.routes';
import {
  formatReturnsSettingsAmount,
  returnsSettingsStatusTone,
} from './returns-settings.utils';

export interface ReturnsSettingsTableProps {
  items: ReadonlyArray<ReturnsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsSettingsTable({
  items,
  selectedId,
  onSelect,
}: ReturnsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-empty`}
      >
        No returns settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingList
                label={item.status}
                tone={returnsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
