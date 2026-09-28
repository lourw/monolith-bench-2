import { CoreStat } from '../../../components/core/stat/core-stat';
import type { SizingDashboardItem } from './sizing-dashboard.model';
import { SIZING_DASHBOARD_FEATURE } from './sizing-dashboard.routes';
import {
  formatSizingDashboardAmount,
  sizingDashboardStatusTone,
} from './sizing-dashboard.utils';

export interface SizingDashboardTableProps {
  items: ReadonlyArray<SizingDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingDashboardTable({
  items,
  selectedId,
  onSelect,
}: SizingDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-empty`}
      >
        No sizing dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreStat
                label={item.status}
                tone={sizingDashboardStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
