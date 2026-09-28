import { LayoutBanner } from '../../../components/layout/banner/layout-banner';
import type { AnalyticsDetailsItem } from './analytics-details.model';
import { ANALYTICS_DETAILS_FEATURE } from './analytics-details.routes';
import {
  formatAnalyticsDetailsAmount,
  analyticsDetailsStatusTone,
} from './analytics-details.utils';

export interface AnalyticsDetailsTableProps {
  items: ReadonlyArray<AnalyticsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsDetailsTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-empty`}
      >
        No analytics details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutBanner
                label={item.status}
                tone={analyticsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
