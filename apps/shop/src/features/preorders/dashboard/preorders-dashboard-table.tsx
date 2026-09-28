import { CorePanel } from '../../../components/core/panel/core-panel';
import type { PreordersDashboardItem } from './preorders-dashboard.model';
import { PREORDERS_DASHBOARD_FEATURE } from './preorders-dashboard.routes';
import {
  formatPreordersDashboardAmount,
  preordersDashboardStatusTone,
} from './preorders-dashboard.utils';

export interface PreordersDashboardTableProps {
  items: ReadonlyArray<PreordersDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersDashboardTable({
  items,
  selectedId,
  onSelect,
}: PreordersDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No preorders dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CorePanel
                label={item.status}
                tone={preordersDashboardStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
