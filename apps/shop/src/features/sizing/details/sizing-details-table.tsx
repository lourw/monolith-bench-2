import { DataToolbar } from '../../../components/data/toolbar/data-toolbar';
import type { SizingDetailsItem } from './sizing-details.model';
import { SIZING_DETAILS_FEATURE } from './sizing-details.routes';
import {
  formatSizingDetailsAmount,
  sizingDetailsStatusTone,
} from './sizing-details.utils';

export interface SizingDetailsTableProps {
  items: ReadonlyArray<SizingDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingDetailsTable({
  items,
  selectedId,
  onSelect,
}: SizingDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_DETAILS_FEATURE.testId}-empty`}
      >
        No sizing details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataToolbar
                label={item.status}
                tone={sizingDetailsStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
