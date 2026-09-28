import { DataBadge } from '../../../components/data/badge/data-badge';
import type { RecommendationsSettingsItem } from './recommendations-settings.model';
import { RECOMMENDATIONS_SETTINGS_FEATURE } from './recommendations-settings.routes';
import {
  formatRecommendationsSettingsAmount,
  recommendationsSettingsStatusTone,
} from './recommendations-settings.utils';

export interface RecommendationsSettingsTableProps {
  items: ReadonlyArray<RecommendationsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsSettingsTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-empty`}
      >
        No recommendations settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataBadge
                label={item.status}
                tone={recommendationsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
