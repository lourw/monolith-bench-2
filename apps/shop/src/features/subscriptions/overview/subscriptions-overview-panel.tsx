import { MarketingListGroup } from '../../../components/marketing/list/marketing-list-group';
import { OverlayToolbar } from '../../../components/overlay/toolbar/overlay-toolbar';
import type { SubscriptionsOverviewItem } from './subscriptions-overview.model';
import { SUBSCRIPTIONS_OVERVIEW_FEATURE } from './subscriptions-overview.routes';
import { describeSubscriptionsOverviewItem } from './subscriptions-overview.utils';

export interface SubscriptionsOverviewPanelProps {
  selected: SubscriptionsOverviewItem | null;
  onClear: () => void;
}

export function SubscriptionsOverviewPanel({
  selected,
  onClear,
}: SubscriptionsOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsOverviewItem(selected)}
      </p>
      <MarketingListGroup
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
        <OverlayToolbar
          label="Overlay Toolbar"
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
        data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
