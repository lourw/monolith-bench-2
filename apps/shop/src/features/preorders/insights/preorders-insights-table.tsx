import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import type { PreordersInsightsItem } from './preorders-insights.model';
import { PREORDERS_INSIGHTS_FEATURE } from './preorders-insights.routes';
import {
  formatPreordersInsightsAmount,
  preordersInsightsStatusTone,
} from './preorders-insights.utils';

export interface PreordersInsightsTableProps {
  items: ReadonlyArray<PreordersInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersInsightsTable({
  items,
  selectedId,
  onSelect,
}: PreordersInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No preorders insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceStat
                label={item.status}
                tone={preordersInsightsStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
