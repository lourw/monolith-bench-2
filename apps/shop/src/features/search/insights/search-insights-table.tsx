import { InputsStat } from '../../../components/inputs/stat/inputs-stat';
import type { SearchInsightsItem } from './search-insights.model';
import { SEARCH_INSIGHTS_FEATURE } from './search-insights.routes';
import {
  formatSearchInsightsAmount,
  searchInsightsStatusTone,
} from './search-insights.utils';

export interface SearchInsightsTableProps {
  items: ReadonlyArray<SearchInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchInsightsTable({
  items,
  selectedId,
  onSelect,
}: SearchInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-empty`}
      >
        No search insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsStat
                label={item.status}
                tone={searchInsightsStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
