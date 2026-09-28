import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import type { ReturnsInsightsItem } from './returns-insights.model';
import { RETURNS_INSIGHTS_FEATURE } from './returns-insights.routes';
import {
  formatReturnsInsightsAmount,
  returnsInsightsStatusTone,
} from './returns-insights.utils';

export interface ReturnsInsightsTableProps {
  items: ReadonlyArray<ReturnsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsInsightsTable({
  items,
  selectedId,
  onSelect,
}: ReturnsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No returns insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingBanner
                label={item.status}
                tone={returnsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
