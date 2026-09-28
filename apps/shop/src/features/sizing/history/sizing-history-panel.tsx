import { FeedbackPanelGroup } from '../../../components/feedback/panel/feedback-panel-group';
import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import type { SizingHistoryItem } from './sizing-history.model';
import { SIZING_HISTORY_FEATURE } from './sizing-history.routes';
import { describeSizingHistoryItem } from './sizing-history.utils';

export interface SizingHistoryPanelProps {
  selected: SizingHistoryItem | null;
  onClear: () => void;
}

export function SizingHistoryPanel({
  selected,
  onClear,
}: SizingHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${SIZING_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingHistoryItem(selected)}
      </p>
      <FeedbackPanelGroup
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
        <TypographyPanel
          label="Typography Panel"
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
        data-testid={`${SIZING_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
