import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { SizingInsightsItem } from './sizing-insights.model';
import { SIZING_INSIGHTS_FEATURE } from './sizing-insights.routes';
import {
  formatSizingInsightsAmount,
  sizingInsightsStatusTone,
} from './sizing-insights.utils';

export interface SizingInsightsTableProps {
  items: ReadonlyArray<SizingInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingInsightsTable({
  items,
  selectedId,
  onSelect,
}: SizingInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-empty`}
      >
        No sizing insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutChip
                label={item.status}
                tone={sizingInsightsStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
