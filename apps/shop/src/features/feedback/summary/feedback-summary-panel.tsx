import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import type { FeedbackSummaryItem } from './feedback-summary.model';
import { FEEDBACK_SUMMARY_FEATURE } from './feedback-summary.routes';
import { describeFeedbackSummaryItem } from './feedback-summary.utils';

export interface FeedbackSummaryPanelProps {
  selected: FeedbackSummaryItem | null;
  onClear: () => void;
}

export function FeedbackSummaryPanel({
  selected,
  onClear,
}: FeedbackSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeFeedbackSummaryItem(selected)}
      </p>
      <CommerceToolbarGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
