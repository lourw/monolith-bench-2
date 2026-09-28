import { FeedbackToolbar } from '../../../components/feedback/toolbar/feedback-toolbar';
import type { BundlesInsightsItem } from './bundles-insights.model';
import { BUNDLES_INSIGHTS_FEATURE } from './bundles-insights.routes';
import {
  formatBundlesInsightsAmount,
  bundlesInsightsStatusTone,
} from './bundles-insights.utils';

export interface BundlesInsightsTableProps {
  items: ReadonlyArray<BundlesInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesInsightsTable({
  items,
  selectedId,
  onSelect,
}: BundlesInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-empty`}
      >
        No bundles insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackToolbar
                label={item.status}
                tone={bundlesInsightsStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
