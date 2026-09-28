import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import type { SupportDetailsItem } from './support-details.model';
import { SUPPORT_DETAILS_FEATURE } from './support-details.routes';
import {
  formatSupportDetailsAmount,
  supportDetailsStatusTone,
} from './support-details.utils';

export interface SupportDetailsTableProps {
  items: ReadonlyArray<SupportDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportDetailsTable({
  items,
  selectedId,
  onSelect,
}: SupportDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-empty`}
      >
        No support details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackList
                label={item.status}
                tone={supportDetailsStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
