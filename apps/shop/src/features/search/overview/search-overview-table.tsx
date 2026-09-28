import { TypographyCard } from '../../../components/typography/card/typography-card';
import type { SearchOverviewItem } from './search-overview.model';
import { SEARCH_OVERVIEW_FEATURE } from './search-overview.routes';
import {
  formatSearchOverviewAmount,
  searchOverviewStatusTone,
} from './search-overview.utils';

export interface SearchOverviewTableProps {
  items: ReadonlyArray<SearchOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchOverviewTable({
  items,
  selectedId,
  onSelect,
}: SearchOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-empty`}
      >
        No search overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyCard
                label={item.status}
                tone={searchOverviewStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
