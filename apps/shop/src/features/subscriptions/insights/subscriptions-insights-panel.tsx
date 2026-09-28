import { FormsToolbarGroup } from '../../../components/forms/toolbar/forms-toolbar-group';
import { FeedbackBanner } from '../../../components/feedback/banner/feedback-banner';
import { InputsStat } from '../../../components/inputs/stat/inputs-stat';
import type { SubscriptionsInsightsItem } from './subscriptions-insights.model';
import { SUBSCRIPTIONS_INSIGHTS_FEATURE } from './subscriptions-insights.routes';
import { describeSubscriptionsInsightsItem } from './subscriptions-insights.utils';

export interface SubscriptionsInsightsPanelProps {
  selected: SubscriptionsInsightsItem | null;
  onClear: () => void;
}

export function SubscriptionsInsightsPanel({
  selected,
  onClear,
}: SubscriptionsInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsInsightsItem(selected)}
      </p>
      <FormsToolbarGroup
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
        <FeedbackBanner
          label="Feedback Banner"
          value={selected.product.rating}
          size="sm"
        />
        <InputsStat
          label="Inputs Stat"
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
        data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
