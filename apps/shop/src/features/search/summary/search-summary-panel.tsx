import { DataHeaderGroup } from '../../../components/data/header/data-header-group';
import { TypographyHeader } from '../../../components/typography/header/typography-header';
import { DataStat } from '../../../components/data/stat/data-stat';
import type { SearchSummaryItem } from './search-summary.model';
import { SEARCH_SUMMARY_FEATURE } from './search-summary.routes';
import { describeSearchSummaryItem } from './search-summary.utils';

export interface SearchSummaryPanelProps {
  selected: SearchSummaryItem | null;
  onClear: () => void;
}

export function SearchSummaryPanel({
  selected,
  onClear,
}: SearchSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSearchSummaryItem(selected)}
      </p>
      <DataHeaderGroup
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
        <TypographyHeader
          label="Typography Header"
          value={selected.product.rating}
          size="sm"
        />
        <DataStat label="Data Stat" value={selected.product.rating} size="sm" />
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
        data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
