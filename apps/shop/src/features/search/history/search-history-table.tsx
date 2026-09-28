import { FeedbackBadge } from '../../../components/feedback/badge/feedback-badge';
import type { SearchHistoryItem } from './search-history.model';
import { SEARCH_HISTORY_FEATURE } from './search-history.routes';
import {
  formatSearchHistoryAmount,
  searchHistoryStatusTone,
} from './search-history.utils';

export interface SearchHistoryTableProps {
  items: ReadonlyArray<SearchHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchHistoryTable({
  items,
  selectedId,
  onSelect,
}: SearchHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_HISTORY_FEATURE.testId}-empty`}
      >
        No search history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackBadge
                label={item.status}
                tone={searchHistoryStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
