import { CoreChip } from '../../../components/core/chip/core-chip';
import type { AnalyticsInsightsItem } from './analytics-insights.model';
import { ANALYTICS_INSIGHTS_FEATURE } from './analytics-insights.routes';
import {
  formatAnalyticsInsightsAmount,
  analyticsInsightsStatusTone,
} from './analytics-insights.utils';

export interface AnalyticsInsightsTableProps {
  items: ReadonlyArray<AnalyticsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsInsightsTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No analytics insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreChip
                label={item.status}
                tone={analyticsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
