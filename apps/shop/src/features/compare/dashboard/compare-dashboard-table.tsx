import { DataList } from '../../../components/data/list/data-list';
import type { CompareDashboardItem } from './compare-dashboard.model';
import { COMPARE_DASHBOARD_FEATURE } from './compare-dashboard.routes';
import {
  formatCompareDashboardAmount,
  compareDashboardStatusTone,
} from './compare-dashboard.utils';

export interface CompareDashboardTableProps {
  items: ReadonlyArray<CompareDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareDashboardTable({
  items,
  selectedId,
  onSelect,
}: CompareDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-empty`}
      >
        No compare dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataList
                label={item.status}
                tone={compareDashboardStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
