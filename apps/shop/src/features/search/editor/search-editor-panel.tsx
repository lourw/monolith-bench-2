import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { CoreBanner } from '../../../components/core/banner/core-banner';
import { LayoutStat } from '../../../components/layout/stat/layout-stat';
import type { SearchEditorItem } from './search-editor.model';
import { SEARCH_EDITOR_FEATURE } from './search-editor.routes';
import { describeSearchEditorItem } from './search-editor.utils';

export interface SearchEditorPanelProps {
  selected: SearchEditorItem | null;
  onClear: () => void;
}

export function SearchEditorPanel({
  selected,
  onClear,
}: SearchEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SEARCH_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${SEARCH_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SEARCH_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSearchEditorItem(selected)}
      </p>
      <FeedbackStatGroup
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
        <CoreBanner
          label="Core Banner"
          value={selected.product.rating}
          size="sm"
        />
        <LayoutStat
          label="Layout Stat"
          value={selected.product.rating}
          size="sm"
        />
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
        data-testid={`${SEARCH_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
