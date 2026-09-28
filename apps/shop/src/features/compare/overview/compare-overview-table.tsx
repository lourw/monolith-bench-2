import { FormsStat } from '../../../components/forms/stat/forms-stat';
import type { CompareOverviewItem } from './compare-overview.model';
import { COMPARE_OVERVIEW_FEATURE } from './compare-overview.routes';
import {
  formatCompareOverviewAmount,
  compareOverviewStatusTone,
} from './compare-overview.utils';

export interface CompareOverviewTableProps {
  items: ReadonlyArray<CompareOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareOverviewTable({
  items,
  selectedId,
  onSelect,
}: CompareOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-empty`}
      >
        No compare overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsStat
                label={item.status}
                tone={compareOverviewStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
