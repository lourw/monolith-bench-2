import { LayoutHeader } from '../../../components/layout/header/layout-header';
import type { SizingOverviewItem } from './sizing-overview.model';
import { SIZING_OVERVIEW_FEATURE } from './sizing-overview.routes';
import {
  formatSizingOverviewAmount,
  sizingOverviewStatusTone,
} from './sizing-overview.utils';

export interface SizingOverviewTableProps {
  items: ReadonlyArray<SizingOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingOverviewTable({
  items,
  selectedId,
  onSelect,
}: SizingOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-empty`}
      >
        No sizing overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutHeader
                label={item.status}
                tone={sizingOverviewStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
