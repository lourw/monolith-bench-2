import { InputsBannerGroup } from '../../../components/inputs/banner/inputs-banner-group';
import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import { FeedbackToolbar } from '../../../components/feedback/toolbar/feedback-toolbar';
import type { SubscriptionsHistoryItem } from './subscriptions-history.model';
import { SUBSCRIPTIONS_HISTORY_FEATURE } from './subscriptions-history.routes';
import { describeSubscriptionsHistoryItem } from './subscriptions-history.utils';

export interface SubscriptionsHistoryPanelProps {
  selected: SubscriptionsHistoryItem | null;
  onClear: () => void;
}

export function SubscriptionsHistoryPanel({
  selected,
  onClear,
}: SubscriptionsHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsHistoryItem(selected)}
      </p>
      <InputsBannerGroup
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
        <FeedbackList
          label="Feedback List"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackToolbar
          label="Feedback Toolbar"
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
        data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
