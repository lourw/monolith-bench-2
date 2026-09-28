import { NavigationListGroup } from '../../../components/navigation/list/navigation-list-group';
import { MediaStat } from '../../../components/media/stat/media-stat';
import { CoreChip } from '../../../components/core/chip/core-chip';
import type { SearchListItem } from './search-list.model';
import { SEARCH_LIST_FEATURE } from './search-list.routes';
import { describeSearchListItem } from './search-list.utils';

export interface SearchListPanelProps {
  selected: SearchListItem | null;
  onClear: () => void;
}

export function SearchListPanel({ selected, onClear }: SearchListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SEARCH_LIST_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${SEARCH_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SEARCH_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSearchListItem(selected)}
      </p>
      <NavigationListGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <MediaStat
          label="Media Stat"
          value={selected.product.rating}
          size="sm"
        />
        <CoreChip label="Core Chip" value={selected.product.rating} size="sm" />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${SEARCH_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
