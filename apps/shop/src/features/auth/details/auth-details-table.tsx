import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import type { AuthDetailsItem } from './auth-details.model';
import { AUTH_DETAILS_FEATURE } from './auth-details.routes';
import {
  formatAuthDetailsAmount,
  authDetailsStatusTone,
} from './auth-details.utils';

export interface AuthDetailsTableProps {
  items: ReadonlyArray<AuthDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthDetailsTable({
  items,
  selectedId,
  onSelect,
}: AuthDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_DETAILS_FEATURE.testId}-empty`}
      >
        No auth details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackCard
                label={item.status}
                tone={authDetailsStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
