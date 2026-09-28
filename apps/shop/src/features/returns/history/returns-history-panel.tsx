import { OverlayListGroup } from '../../../components/overlay/list/overlay-list-group';
import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { ReturnsHistoryItem } from './returns-history.model';
import { RETURNS_HISTORY_FEATURE } from './returns-history.routes';
import { describeReturnsHistoryItem } from './returns-history.utils';

export interface ReturnsHistoryPanelProps {
  selected: ReturnsHistoryItem | null;
  onClear: () => void;
}

export function ReturnsHistoryPanel({
  selected,
  onClear,
}: ReturnsHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RETURNS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${RETURNS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RETURNS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReturnsHistoryItem(selected)}
      </p>
      <OverlayListGroup
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
        <MediaToolbar
          label="Media Toolbar"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackTile
          label="Feedback Tile"
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
        data-testid={`${RETURNS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
