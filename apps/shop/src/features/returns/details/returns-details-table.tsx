import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import type { ReturnsDetailsItem } from './returns-details.model';
import { RETURNS_DETAILS_FEATURE } from './returns-details.routes';
import {
  formatReturnsDetailsAmount,
  returnsDetailsStatusTone,
} from './returns-details.utils';

export interface ReturnsDetailsTableProps {
  items: ReadonlyArray<ReturnsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsDetailsTable({
  items,
  selectedId,
  onSelect,
}: ReturnsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_DETAILS_FEATURE.testId}-empty`}
      >
        No returns details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsTile
                label={item.status}
                tone={returnsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
