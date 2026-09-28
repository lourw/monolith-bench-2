import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import type { FeedbackListItem } from './feedback-list.model';
import { FEEDBACK_LIST_FEATURE } from './feedback-list.routes';
import { describeFeedbackListItem } from './feedback-list.utils';

export interface FeedbackListPanelProps {
  selected: FeedbackListItem | null;
  onClear: () => void;
}

export function FeedbackListPanel({
  selected,
  onClear,
}: FeedbackListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${FEEDBACK_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${FEEDBACK_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${FEEDBACK_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeFeedbackListItem(selected)}
      </p>
      <DataCardGroup
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
        <ChartsTile
          label="Charts Tile"
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
        data-testid={`${FEEDBACK_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
