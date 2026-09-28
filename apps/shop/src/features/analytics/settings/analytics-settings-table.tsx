import { CoreList } from '../../../components/core/list/core-list';
import type { AnalyticsSettingsItem } from './analytics-settings.model';
import { ANALYTICS_SETTINGS_FEATURE } from './analytics-settings.routes';
import {
  formatAnalyticsSettingsAmount,
  analyticsSettingsStatusTone,
} from './analytics-settings.utils';

export interface AnalyticsSettingsTableProps {
  items: ReadonlyArray<AnalyticsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsSettingsTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-empty`}
      >
        No analytics settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreList
                label={item.status}
                tone={analyticsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
