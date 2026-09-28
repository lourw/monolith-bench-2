import { TypographyCardGroup } from '../../../components/typography/card/typography-card-group';
import { CommercePanel } from '../../../components/commerce/panel/commerce-panel';
import type { FeedbackInsightsItem } from './feedback-insights.model';
import { FEEDBACK_INSIGHTS_FEATURE } from './feedback-insights.routes';
import { describeFeedbackInsightsItem } from './feedback-insights.utils';

export interface FeedbackInsightsPanelProps {
  selected: FeedbackInsightsItem | null;
  onClear: () => void;
}

export function FeedbackInsightsPanel({
  selected,
  onClear,
}: FeedbackInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeFeedbackInsightsItem(selected)}
      </p>
      <TypographyCardGroup
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
        <CommercePanel
          label="Commerce Panel"
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
        data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
