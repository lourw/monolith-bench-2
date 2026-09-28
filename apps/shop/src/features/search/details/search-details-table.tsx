import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import type { SearchDetailsItem } from './search-details.model';
import { SEARCH_DETAILS_FEATURE } from './search-details.routes';
import {
  formatSearchDetailsAmount,
  searchDetailsStatusTone,
} from './search-details.utils';

export interface SearchDetailsTableProps {
  items: ReadonlyArray<SearchDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchDetailsTable({
  items,
  selectedId,
  onSelect,
}: SearchDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_DETAILS_FEATURE.testId}-empty`}
      >
        No search details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyTile
                label={item.status}
                tone={searchDetailsStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
