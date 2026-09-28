import { FeedbackPanelGroup } from '../../../components/feedback/panel/feedback-panel-group';
import { FormsStat } from '../../../components/forms/stat/forms-stat';
import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import type { StoreLocatorDashboardItem } from './store-locator-dashboard.model';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from './store-locator-dashboard.routes';
import { describeStoreLocatorDashboardItem } from './store-locator-dashboard.utils';

export interface StoreLocatorDashboardPanelProps {
  selected: StoreLocatorDashboardItem | null;
  onClear: () => void;
}

export function StoreLocatorDashboardPanel({
  selected,
  onClear,
}: StoreLocatorDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorDashboardItem(selected)}
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
        <FormsStat
          label="Forms Stat"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackCard
          label="Feedback Card"
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
        data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
