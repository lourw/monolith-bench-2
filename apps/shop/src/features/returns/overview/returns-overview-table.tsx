import { OverlayBadge } from '../../../components/overlay/badge/overlay-badge';
import type { ReturnsOverviewItem } from './returns-overview.model';
import { RETURNS_OVERVIEW_FEATURE } from './returns-overview.routes';
import {
  formatReturnsOverviewAmount,
  returnsOverviewStatusTone,
} from './returns-overview.utils';

export interface ReturnsOverviewTableProps {
  items: ReadonlyArray<ReturnsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsOverviewTable({
  items,
  selectedId,
  onSelect,
}: ReturnsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No returns overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBadge
                label={item.status}
                tone={returnsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
