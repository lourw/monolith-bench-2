import { TypographyHeader } from '../../../components/typography/header/typography-header';
import type { ReturnsDashboardItem } from './returns-dashboard.model';
import { RETURNS_DASHBOARD_FEATURE } from './returns-dashboard.routes';
import {
  formatReturnsDashboardAmount,
  returnsDashboardStatusTone,
} from './returns-dashboard.utils';

export interface ReturnsDashboardTableProps {
  items: ReadonlyArray<ReturnsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsDashboardTable({
  items,
  selectedId,
  onSelect,
}: ReturnsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No returns dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyHeader
                label={item.status}
                tone={returnsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
