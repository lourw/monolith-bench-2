import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { SupportInsightsItem } from './support-insights.model';
import { SUPPORT_INSIGHTS_FEATURE } from './support-insights.routes';
import {
  formatSupportInsightsAmount,
  supportInsightsStatusTone,
} from './support-insights.utils';

export interface SupportInsightsTableProps {
  items: ReadonlyArray<SupportInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportInsightsTable({
  items,
  selectedId,
  onSelect,
}: SupportInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-empty`}
      >
        No support insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={supportInsightsStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
