import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import type { SearchSettingsItem } from './search-settings.model';
import { SEARCH_SETTINGS_FEATURE } from './search-settings.routes';
import {
  formatSearchSettingsAmount,
  searchSettingsStatusTone,
} from './search-settings.utils';

export interface SearchSettingsTableProps {
  items: ReadonlyArray<SearchSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchSettingsTable({
  items,
  selectedId,
  onSelect,
}: SearchSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-empty`}
      >
        No search settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackCard
                label={item.status}
                tone={searchSettingsStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
