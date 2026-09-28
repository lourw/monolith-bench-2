import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import type { PreordersDetailsItem } from './preorders-details.model';
import { PREORDERS_DETAILS_FEATURE } from './preorders-details.routes';
import {
  formatPreordersDetailsAmount,
  preordersDetailsStatusTone,
} from './preorders-details.utils';

export interface PreordersDetailsTableProps {
  items: ReadonlyArray<PreordersDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersDetailsTable({
  items,
  selectedId,
  onSelect,
}: PreordersDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-empty`}
      >
        No preorders details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackChip
                label={item.status}
                tone={preordersDetailsStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
