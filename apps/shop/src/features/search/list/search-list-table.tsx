import { MediaList } from '../../../components/media/list/media-list';
import type { SearchListItem } from './search-list.model';
import { SEARCH_LIST_FEATURE } from './search-list.routes';
import {
  formatSearchListAmount,
  searchListStatusTone,
} from './search-list.utils';

export interface SearchListTableProps {
  items: ReadonlyArray<SearchListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchListTable({
  items,
  selectedId,
  onSelect,
}: SearchListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_LIST_FEATURE.testId}-empty`}
      >
        No search list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_LIST_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaList
                label={item.status}
                tone={searchListStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
